import React, { useEffect, useState } from "react";
import phone_guy from "../assets/PNG/about-img.png";
import { serverUrl } from "../api-config/config.js";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const RequestPickup = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDialCode, setDialCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [scrapId, setScrapId] = useState("");
    const [countriesAndStates, setcountriesAndStates] = useState([]);


    const { state } = useLocation(); const { id } = state;
    console.log("Scrap Id", id)

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${serverUrl}/getCountries`, {
                headers: { platform: "web" },
            });

            const countriesAndStatesData = response.data.data;

            console.log("countriesAndStatesData", countriesAndStatesData);




            setcountriesAndStates(countriesAndStatesData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log("countriesAndStates", countriesAndStates);

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;

        console.log("selectedCountry", selectedCountry);
        setSelectedCountry(selectedCountry);
        setSelectedState("");
        for (let i = 0; countriesAndStates.length > i; i++) {
            console.log("dial Code", countriesAndStates[0].phone_code);
            setDialCode(countriesAndStates[0].phone_code)
        }
    };
    // Get the list of states based on the selected country
    const states = selectedCountry
        ? countriesAndStates.find((country) => country.iso2 === selectedCountry)
            ?.states || []
        : [];
    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };
    // Get the list of cities based on the selected state
    const cities =
        states.filter((el) => {
            if (el.state_code === selectedState) {
                return el.cities;
            }
        })[0]?.cities || [];

    const handleCityChange = (event) => {
        const citySelected = event.target.value;
        setSelectedCity(citySelected);
    };


    const handleConfirm = async () => {
        const payload = {
            fullName: fullName,
            city: selectedCity,
            address: address,
            pincode: JSON.parse(pincode),
            scrapId: id,
            stateCode: selectedState,
            countryCode: selectedCountry,
            dialCode: selectedDialCode,
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
                    navigate("/Success-page", { replace: true })
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
                            <div className="grid  grid-cols-2 gap-6">
                                <div>
                                    <label className="block py-3 text-black">Select Country</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <div className="w-full">
                                            <select
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                            >
                                                <option value="">Select Country</option>
                                                {countriesAndStates.map((country) => (
                                                    <option key={country.iso2} value={country.iso2}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block py-3 text-black">Select State</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <div className="w-full">
                                            <select value={selectedState} onChange={handleStateChange}>
                                                <option value="">Select State</option>
                                                {states.map((stateObj) => (
                                                    <option
                                                        key={stateObj.state_code}
                                                        value={stateObj.state_code}
                                                    >
                                                        {stateObj.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div className="grid  grid-cols-3 gap-6">
                                <div>
                                    <label className="block py-3 text-black">DialCode</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <input
                                            defaultValue={selectedDialCode}
                                            placeholder="Select DialCode"
                                            className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2">
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

                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <div className="grid  grid-cols-2 gap-6">
                                <div>
                                    <label className="block py-3 text-black">Enter Pincode</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <input
                                            onChange={(e) => {
                                                setPincode(e.target.value);
                                            }}
                                            placeholder="Enter Pincode"
                                            className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block py-3 text-black">Select City</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <div className="w-full">
                                            <select value={selectedCity} disabled={!selectedState} onChange={handleCityChange}>
                                                <option value="">Select City</option>
                                                {cities.map((cityObj) => (
                                                    <option key={cityObj.id} value={cityObj.id}>
                                                        {cityObj.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

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