import React, {
    useEffect, useState
} from "react";
import phone_guy from "../assets/PNG/about-img.png";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadType } from '../api-config/commonUploadType';
import {
    serverUrl
} from "../api-config/config";
import { useNavigate } from "react-router-dom";
import api from '../api-config/axiosInstance';

const UploadScrap = () => {

    const options = [

        { label: 'Kilogram', value: 'KG' },

        { label: 'per/piece', value: 'per/piece' },

    ];
    const navigate = useNavigate();
    const [value, setValue] = React.useState('fruit');
    const handleChange = (event) => {

        setValue(event.target.value);
        setquantityType(event.target.value);
        console.log("onchange ", event.target.value)

    };
    const [scrapName,
        setScrapName] = useState("");
    const [quantityType,
        setquantityType] = useState("");
    // const [image, setImage] = useState('');
    const [preview,
        setPreview] = useState("");
    const [quantity,
        setQuantity] = useState("");
    const [price,
        setPrice] = useState("");
    // const [address,
    //     setAddress] = useState("");
    // const [kilogram,
    //     setKilogram] = useState("");
    const [imageKey,
        setImageKey] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const token = localStorage.getItem("token");
    const headers = {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        platform: "web"
    };
    const handleImage = async (e) => {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);

        setPreview(previewUrl);
        const payload = {
            ContentType: file.type,
            fileName: file.name,
            uploadType: "scrap"
        };

        try {
            const signedUrl = await axios.post(`${serverUrl}/generateS3UploadSignedUrl`, payload, {
                headers: headers
            });
            //  console.log('image signed url outside axios block', signedUrl);

            const imageSignedObj = JSON.parse(signedUrl.data.data);

            setImageKey(imageSignedObj.key);

            console.log("image signed url outside axios block", imageSignedObj.signedUrl, imageSignedObj.key);

            const uploadResponse = await fetch(imageSignedObj.signedUrl, {
                body: file,
                headers: {
                    "Content-Type": file.type // Set the Content-Type header based on the image type
                },
                method: "PUT"
            });

            console.log("uploadResponse", uploadResponse);
        }
        catch (error) {
            console.error("Axios Error:", error);
        }
    };

    // useEffect to log imageKey when it changes
    useEffect(() => {
        console.log("imageKey updated:", imageKey);
    }, [imageKey]);

    // console.log(varName);
    const uploadData = async () => {
        // const formData = new FormData();

        // formData.append("scrapName", scrapName);
        // // formData.append('scrapImage', image);
        // formData.append("quantityType", quantity);
        // formData.append("price", price);
        // formData.append("address", address);
        // formData.append("kilogram", kilogram);
        // formData.append("stateCode", kilogram);
        // formData.append("countryCode", "IN");
        const dataPayload = {
            // address,
            // countryCode: "IN",
            scrapName: scrapName,
            price: parseInt(price),
            quantityType: quantityType,
            quantity: parseInt(quantity),
            imageKey: imageKey,
            // kilogram,
            // price,
            // quantity,
            // scrapName,
            // stateCode: "JH"
        };

        console.log("dataPayload", dataPayload);
        try {
            const response = await api.post(`${serverUrl}/addScrap`, dataPayload);
            const data = response.data;
            if (data.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: response.data.message
                });
                navigate("/pricing", { replace: true })
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response) {
                // If server responded with a status code for a request  
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: "Something Went Wrong"
                });
            }
            else if (error.request) {
                // Client made a request but response is not received 
                console.log("<<<<<<<Response Not Received>>>>>>>>");
                console.log(error.request);
            }
            else {
                // Other case 
                console.log("Error", error.message);
            }
        }
        // await axios
        //     .post(`${serverUrl}/addScrap`, dataPayload, {
        //         headers: headers
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         const data = res.data;
        //         Swal.fire({
        //             icon: "success",
        //             position: "center",
        //             showConfirmButton: false,
        //             timer: 2500,
        //             title: "Product Uploaded successfully "
        //         });
        //         if (data.statusCode === 200) {
        //             navigate("/pricing", { replace: true })
        //         }
        //     })

        //     .catch((error) => {
        //         // Handle the error here
        //         console.error("Axios Error:", error);
        //     });
    };

    return (
        <div className="w-full flex justify-center  p-4 md:mt-[150px] sm:mt-[20px] ">
            <div className="flex flex-col md:flex-row-reverse justify-between items-center w-full md:w-[80%] flex-wrap">
                <div className=" w-full md:w-[40%] h-[300px] md:h-[700px]  mb-[30px]">
                    <img
                        src={phone_guy}
                        alt="Map"
                        className=" inset-0 w-full h-full object-cover sm:object-contain sm:mt-[0] mt-14"
                    />
                </div>
                <div className="w-full md:w-[50%] mb-4 md:mb-0 shadow-lg p-[20px]">
                    <div className="w-[100%] p-[10px]">
                        <h1 className="text-[45px] font-bold text-black text-center">
                            Upload Scrap
                        </h1>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <div>
                            <label className="block py-3 text-black">Enter Scrap Name</label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                <input
                                    onChange={(e) => {
                                        setScrapName(e.target.value);
                                    }}
                                    placeholder="Enter Scrap Name"
                                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-span-6 sm:col-span-3">
                        <div>
                            <label className="block py-3 text-black">
                                Enter Your Location
                            </label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                <input
                                    placeholder="Enter Your Location"
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className="col-span-6 sm:col-span-3 mt-5">
                        <div className="grid grid-cols-4 gap-4">
                            <div >
                                <label className="block py-3 text-black">
                                    Select quantity type
                                </label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <div className="w-full">
                                        <select value={value} onChange={handleChange}>
                                            {options.map((option) => (
                                                <option value={option.value}>{option.label}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label className="block py-3 text-black">
                                    Enter Available Quantity
                                </label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <input
                                        onChange={(e) => {
                                            setQuantity(e.target.value);
                                        }}
                                        placeholder="Enter Available Quantity"
                                        className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-span-6 sm:col-span-3 mt-5">
                        <div>
                            <label className="block py-3 text-black">Enter Price</label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                <input
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                    placeholder="Enter Price"
                                    className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-span-6 sm:col-span-3">
                        <div>
                            <label className="block py-3 text-black">Kilogram</label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c] mb-[20px]">
                                <input
                                    placeholder="input kg"
                                    onChange={(e) => {
                                        setKilogram(e.target.value);
                                    }}
                                    className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className="col-span-6 sm:col-span-3 mt-5">
                        <label className="" htmlFor="">
                            Upload Scrap image
                        </label>
                        <div className="relative">
                            <label
                                htmlFor="pix"
                                className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="scrap"
                                        className="mx-auto h-32 object-cover rounded-md mb-4"
                                    />
                                ) : (
                                    <span className="text-gray-500 mb-4">Upload Scrap Image</span>
                                )}
                            </label>
                            <input
                                id="pix"
                                type="file"
                                className="hidden"
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                    <br />

                    <br />
                    <div className="col-span-6 sm:col-span-3 mt-5">
                        <button
                            onClick={uploadData}
                            className="w-full h-[50px] text-white font-extrabold bg-[#81D742] rounded-[30px]"
                        >
                            Confirm
                        </button>
                    </div>

                    {/* <div>
                <p>Don't have an account?</p>
              </div> */}
                </div>
            </div>
        </div>
    );
};

export default UploadScrap;
