import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../api-config/axiosInstance";

import Button from "../../Components/auth/Button";
import Input from "../../Components/auth/Input";


const SmallAddressVerify = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [checked, setChecked] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [otp, setOtp] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDialCode, setDialCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countriesAndStates, setcountriesAndStates] = useState([]);

    const [address, setAddress] = useState("");

    const location = useLocation();

    console.log("userId", location.state.userId);
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/getCountries");

            const countriesAndStatesData = JSON.parse(response.data.data);

            console.log("countriesAndStatesData", countriesAndStatesData);

            setcountriesAndStates(countriesAndStatesData);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);
    console.log("countriesAndStates", countriesAndStates);

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;

        console.log("selectedCountry", selectedCountry);
        setSelectedCountry(selectedCountry);
        setSelectedState("");
        for (let i = 0; countriesAndStates.length > i; i++) {
            console.log("dial Code", countriesAndStates[0].phone_code);
            setDialCode(`${countriesAndStates[0].phone_code}`);
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
            if (el.state_code === selectedState)
                return el.cities;
        })[0]?.cities || [];

    const handleCityChange = (event) => {
        const citySelected = event.target.value;

        setSelectedCity(citySelected);
    };


    const handleAddressVerify = async () => {
        const payload = {
            "userId": location.state.userId,
            "firstName": firstName,
            "lastName": lastName,
            "city": selectedCity,
            "countryCode": selectedCountry,
            "stateCode": selectedState,
            "address": address
        };

        try {
            const resp = await axiosInstance.post("/addUserDetail", payload);
            const dataObject = resp.data;
            const tokenParse = JSON.parse(dataObject.data);
            console.log("token", tokenParse.token);
            localStorage.setItem("token", tokenParse.token);
            if (dataObject.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: true,
                    timer: 2500,
                    title: dataObject.message
                });
                navigate("/pricing",);
            }
        }
        catch (error) {
            console.error("error", error);

            if (error.response) {
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: error.response.data.error._message
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
            // Error handling here 
        }
    };
    return (
        <div className="small-devices p-2">
            <div className="shadow-lg">
                <h2 className="text-center font-semibold text-[16.55px] text-[#5AB344] border-b-2 border-b-[#5AB344] p-5 mt-5">
                    Sign Up as Vendor
                </h2>
                <form className="mt-2 p-5">
                    <div className="grid  grid-cols-2 gap-6">

                        <div>
                            <label className="block py-3 text-black">First Name</label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                <input
                                    required
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                    placeholder="Enter First Name"
                                    className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block py-3 text-black">Last Name</label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                <input
                                    required
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                    placeholder="Enter Last Name"
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
                                    required
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
                                        <select className="w-full bg-[#80d7421c] p-1"
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
                                        <select className="w-full bg-[#80d7421c] p-1" value={selectedState} onChange={handleStateChange}>
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
                        <div>
                            <label className="block py-3 text-black">Select City</label>
                            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                <div className="w-full">
                                    <select className="w-full bg-[#80d7421c] p-1" value={selectedCity} disabled={!selectedState} onChange={handleCityChange}>
                                        <option value="">Select City</option>
                                        {cities.map((cityObj) => (
                                            <option key={cityObj.id} value={cityObj.name}>
                                                {cityObj.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <p className="text-[#666666] text-[16px]">Upload Pan Card</p>
            <div className="border border-[#66666659] rounded-[12px] p-3 w-full cursor-pointer mb-2">
              <label htmlFor="upload">
                <span className="rounded-[8px] bg-[#DFDFDF] font-[400] text-[16px] text-[#666666] p-2 hidden lg:inline">
                  Choose an image
                </span>
                <span className="ml-2 text-[#D9D9D9] text-[16px] font-[400]">
                  No files selected
                </span>
                <Input type="file" classname="hidden w-full" id="upload" />
              </label>
            </div> */}
                    {/* <p className="text-[#666666] text-[16px]">Upload Photo</p>
            <div className="border border-[#66666659] rounded-[12px] p-3 w-full cursor-pointer mb-2">
              <label htmlFor="upload">
                <span className="rounded-[8px] bg-[#DFDFDF] font-[400] text-[16px] text-[#666666] p-2 hidden lg:inline">
                  Choose an image
                </span>
                <span className="ml-2 text-[#D9D9D9] text-[16px] font-[400]">
                  No files selected
                </span>
                <Input type="file" classname="hidden w-full" id="upload" />
              </label>
            </div> */}
                    {/* <StepThree /> */}
                    <p className="text-[14px] text-[#666666] font-semibold mt-10 mb-5">
                        <Input
                            type="checkbox"
                            classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                            value={checked}
                            checked={checked}
                            handleChange={() => setChecked((prevState) => !prevState)}
                        />{" "}
                        By creating an account, I agree to our
                        <span className="underline cursor-pointer">
                            Terms of use
                        </span> and{" "}
                        <span className="underline cursor-pointer">Privacy Policy </span>
                    </p>
                    <Button handleClick={handleAddressVerify}
                        label={loading ? "Please wait ...." : "Continue"}
                        classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"


                    />
                    <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3">
                        Already have an account?{" "}
                        <span
                            className="font-semibold cursor-pointer underline hover:text-[#5AB344]"
                            onClick={() => navigate("/vendor-signIn")}
                        >
                            Sign in
                        </span>{" "}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SmallAddressVerify;
