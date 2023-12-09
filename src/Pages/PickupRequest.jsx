import { useEffect, useState } from "react";
import phone_guy from "../assets/PNG/about-img.png";
import {serverUrl} from "../api-config/config.js";
// import Nav from "../Common/Navbar/Nav";
// import Footer from "../Common/Footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";

const RequestPickup = () => {
    const [formData, setFormData] = useState({
        fullName: "David",
        phoneNumber: "+2349135914309",
        pincode: "123456",
        address: "gdh",
        landmark: "gdh",
        city: "Aj",
        scrapItem: "65469caa8bd30784068e1bcc",
        price: 1000,
        quantity: 5,
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirm = async () => {
        const dataPayload = {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            pincode: formData.pincode,
            address: formData.address,
            landmark: formData.landmark,
            city: formData.city,
            scrapItem: formData.scrapItem,
            price: formData.price,
            quantity: formData.quantity,
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            "platform": "web",
        };

        await axios
        .post(`${serverUrl}/addPickUpAddress`, dataPayload, { headers: headers })
        .then((res) => {
            const data = res.data;

            if(data.statusCode == 200){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: true,
                    timer: 2500,
                });
                // return <Redirect to='/otp-verify' />
                
            }
            console.log("ffdgfdfg",res);
           
        })

        .catch((error) => {
            console.log("Data", error.response.data);
            if (error.response) {
                // If server responded with a status code for a request 
                console.log("Data", error.response.data);
                const data = error.response.data

                if (data.error.statusCode == 400) {
                    const mess = data.error;
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: mess._message,
                        showConfirmButton: false,
                        timer: 2500,
                    });
                    
                }

                console.log("Status", error.response.status);
                console.log("Headers", error.response.headers);
            } else if (error.request) {
                // Client made a request but response is not received 
                console.log("<<<<<<<Response Not Received>>>>>>>>");
                console.log(error.request);
            } else {
                // Other case 
                console.log("Error", error.message);
            }
            // Error handling here 

        });
        // try {
        //     const response = await axios.post(`${serverUrl}/addPickUpAddress`,
        //         dataPayload,

        //         {
        //             headers: {
        //                 "Access-Control-Allow-Origin": "*",
        //                 Authorization: `Bearer ${token}`,
        //                 'platform':'web'
        //             },
        //         }
        //     );
        //     console.log(response, ">>>");
        // } catch (error) {
        //     console.error(error);
        //     const data = error.response.data;
        //     if(data.error.statusCode == 400){
        //         Swal.fire({
        //             position: "center",
        //             icon: "error",
        //             title: data.error._message,
        //             showConfirmButton: false,
        //             timer: 2500,
        //         });
        //     }
        // }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const inputs = [
        {
            type: "text",
            name: "fullName",
            label: "Full Name",
            placeholder: "full name",
            value: formData.fullName,
        },
        {
            type: "number",
            name: "phoneNumber",
            label: "Phone Number",
            placeholder: "Phone Number",
            value: formData.phoneNumber,
        },
        {
            type: "number",
            name: "pincode",
            label: "Pincode",
            placeholder: "Pincode",
            value: formData.pincode,
        },
        {
            type: "text",
            name: "address",
            label: "Address",
            placeholder: "Address",
            value: formData.address,
        },
        {
            type: "text",
            name: "landmark",
            label: "Land Mark",
            placeholder: "land mark",
        },
        {
            type: "text",
            name: "city",
            label: "City",
            placeholder: "City",
            value: formData.city,
        },
        {
            type: "text",
            name: "scrapItem",
            label: "Scrap Item",
            placeholder: "item id",
            value: formData.scrapItem,
        },
        {
            type: "number",
            name: "price",
            label: "Price",
            placeholder: "price",
            value: formData.price,
        },
        {
            type: "number",
            name: "quantity",
            label: "Quantity",
            placeholder: "quantity",
            value: formData.quantity,
        },
    ];

    return (
        <div>
            
            <div className="w-full flex justify-center items-center p-4 md:mt-[150px] sm:mt-[20px] mt-14 ">
                <div className="flex flex-col md:flex-row justify-between items-start w-full md:w-[80%] flex-wrap">
                    <div className="w-full md:w-[40%] h-[300px] md:h-auto">
                        <img
                            src={phone_guy}
                            alt="Map"
                            className="inset-0 w-full h-full object-cover sm:object-contain"
                        />
                    </div>
                    <div className="w-full md:w-[50%] mb-4 md:mb-0 shadow-lg p-[20px]">
                        <div className="w-[100%] p-[10px]">
                            <h1 className="text-[45px] font-bold text-black text-center">
                                Request Pickup
                            </h1>
                        </div>
                        {inputs.map((input) => (
                            <div className="col-span-6 sm:col-span-3" key={input.name}>
                                <div>
                                    <label className="block py-3 text-black">{input.label}</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <input
                                            type={input.type}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            value={formData[input.name]}
                                            onChange={handleChange}
                                            className="w-full p-1 ml-3 text-black outline-none bg-transparent "
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <br />
                        <div className="w-[100%]">
                            <p className="text-right text-red-400 cursor-pointer">
                                Forgot Password?
                            </p>
                        </div>
                        <br />
                        <div className="col-span-6 sm:col-span-3">
                            <button
                                onClick={handleConfirm}
                                className="w-full h-[50px] text-white font-extrabold bg-[#81D742] rounded-[30px]"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    );
};

export default RequestPickup;
