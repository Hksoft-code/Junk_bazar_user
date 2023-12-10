import React, {
    Fragment,
    useEffect, useState
} from "react";
import phone_guy from "../assets/PNG/about-img.png";
import {
    serverUrl
} from "../api-config/config.js";

import axios from "axios";
import Swal from "sweetalert2";

const RequestPickup = () => {

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    }, []);

    const getData = () => {
        axios({
            url: `${serverUrl}/getCountries`,
            method: 'get',
            headers: {
                platform: "web"
            }
        })
            .then(response => {
                console.log(response)
                const data = JSON.parse(response.data.data);
                console.log("Country Details", data);
                setArtists(data.states);



            })
            .catch(err => {
                console.log(err);
            });
    };

    const [value2, setValue] = React.useState('fruit');
    const handleChange = (event) => {

        setValue(event.target.value);
        setCountryCode(event.target.value);
        console.log("onchange ", event.target.value)

    };



    const [value1, setValue1] = React.useState('fruit');
    const handleStateCode = (event) => {

        setValue1(event.target.value);
        setstateCode(event.target.value);
        console.log("onchange ", event.target.value)

    };


    const [fullName,
        setFullName] = useState("");
    const [address,
        setAddress] = useState("");
    const [Pincode,
        setPincode] = useState("");
    const [scrapId,
        setScrapId] = useState("");
    const [stateCode,
        setstateCode] = useState("");
    const [countryCode,
        setCountryCode] = useState("");
    const [dialCode,
        setDialCode] = useState("");
    const [phoneNumber,
        setPhoneNumber] = useState("");
    const [CityName,
        setCityName] = useState("");

    const token = localStorage.getItem("token");

    const handleConfirm = async () => {
        const payload = {
            fullName: fullName,
            city: CityName,
            address: address,
            pincode: JSON.parse(Pincode),
            scrapId: "afghjf",
            stateCode: stateCode,
            countryCode: "IND",
            dialCode: +91,
            phoneNumber: phoneNumber
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            platform: "web"
        };

        await axios
            .post(`${serverUrl}/addPickUpAddress`, payload, {
                headers: headers
            })
            .then((res) => {
                const data = res.data;

                if (data.statusCode === 200) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        showConfirmButton: true,
                        timer: 2500,
                        title: data.message
                    });
                    // return <Redirect to='/otp-verify' />
                }

                console.log("ffdgfdfg", res);
            })

            .catch((error) => {
                console.log("Data", error.response.data);

                if (error.response) {
                    // If server responded with a status code for a request 
                    console.log("Data", error.response.data);
                    const data = error.response.data;

                    if (data.error.statusCode === 400) {
                        const mess = data.error;

                        Swal.fire({
                            icon: "error",
                            position: "center",
                            showConfirmButton: false,
                            timer: 2500,
                            title: mess._message
                        });
                    }

                    console.log("Status", error.response.status);
                    console.log("Headers", error.response.headers);
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
                // Error handling here 
            });

    };





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

                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Enter Full Name</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <input
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                        }}
                                        placeholder="Enter Full Name"
                                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Enter Phone Number</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <input
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                        }}
                                        placeholder="Enter Phone Number"
                                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Enter Address</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <input
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                        placeholder="Enter Address"
                                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Enter City</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <div className="w-full">

                                        <input
                                            onChange={(e) => {
                                                setCityName(e.target.value);
                                            }}
                                            placeholder="Enter City"
                                            className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Enter Pincode</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <input
                                        onChange={(e) => {
                                            setPincode(e.target.value);
                                        }}
                                        placeholder="Enter Scrap Name"
                                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Select State</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">

                                    <div className="w-full">
                                        <select value={value1} onChange={handleStateCode}>
                                            <option >Select State</option>
                                            {artists.map((option) => (
                                                <option value={option.state_code}>{option.name}</option>
                                            ))}



                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Select Country</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">

                                    <div className="w-full">
                                        <select value="IND" onChange={handleChange}>
                                            <option >Select Country</option>
                                            <option value="IND">INDIA</option>


                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div>
                                <label className="block py-3 text-black">Select DialCode</label>
                                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                    <input
                                        onChange={(e) => {
                                            setDialCode(e.target.value);
                                        }}
                                        placeholder="Select DialCode"
                                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>

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
