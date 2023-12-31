import React, { useEffect, useState } from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input.jsx";
import LabeledInput from "../../Components/auth/LabeledInput.jsx";
import Button from "../../Components/auth/Button.jsx";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import flag from "../../assets/PNG/fllag.png";
import axiosInstance from "../../api-config/axiosInstance.js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SmallAddressVerify from "./SmallAddressVerify.jsx";

const AddressVerify = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDialCode, setDialCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countriesAndStates, setcountriesAndStates] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const location = useLocation();
  const [addressError, setAddressError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  console.log("userId", location.state.userId);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getCountries");

      const countriesAndStatesData = JSON.parse(response.data.data);

      console.log("countriesAndStatesData", countriesAndStatesData);

      setcountriesAndStates(countriesAndStatesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  const isValidName = (value) => {
    // Check if the input is not composed entirely of zeros or whitespaces
    return value.trim() !== "0" && value.trim() !== "";
  };
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
      if (el.state_code === selectedState) return el.cities;
    })[0]?.cities || [];

  const handleCityChange = (event) => {
    const citySelected = event.target.value;

    setSelectedCity(citySelected);
  };

  const handleAddressVerify = async () => {
    const payload = {
      userId: location.state.userId,
      firstName: firstName,
      lastName: lastName,
      city: selectedCity,
      countryCode: selectedCountry,
      stateCode: selectedState,
      address: address,
    };

    try {
      const resp = await axiosInstance.post("/addUserDetail", payload);
      const dataObject = resp.data;
      const tokenParse = JSON.parse(dataObject.data);

      if (dataObject.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: dataObject.message,
        });
        console.log("token store ", localStorage.getItem("token"));

        navigate("/pricing", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Error", error);

      if (error.response) {
        // status code out of the range of 2xx
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: error.response.data.error._message,
        });

        console.log("Status :" + error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Error on setting up the request
        console.log("Error", error.message);
      }
    }
  };

  return (
    <>
      <SmallAddressVerify />
      <div
        id="CustomerRoot"
        className="signup-container overflow-hidden bg-white flex flex-row justify-between pr-5 w-full font-['Gilroy-Medium'] items-start"
      >
        <div className="flex flex-col gap-6 w-1/2 items-start mt-10 mb-[-68px]">
          <div className="flex flex-col ml-32 gap-6 w-2/3 items-start">
            <div
              id="WelcomeToJunkBazar2"
              className="text-3xl font-['Poppins'] font-semibold leading-[68px] text-[#4a4a4a]"
            >
              Welcome To<span className="text-white"> </span>
              <span className="text-[#5ab344]">JunkBazar</span>
            </div>
            <div className="text-1xl -mt-5 text-[#707070]">
              Sign up to enjoy exclusive access!
            </div>
          </div>
          <img
            className="-mt-10"
            src="https://file.rendit.io/n/Hg4qcVTUxAZcSfagaPln.png"
            alt="Customer"
            id="Customer"
          />
        </div>
        <div
          id="SignUpNow1"
          className="shadow-[-9px_39px_56px_0px_rgba(0,_0,_0,_0.15)] bg-white flex flex-col justify-between  w-2/5 h-[651px] items-start pt-5 pb-5 pl-10 rounded-[24px]"
        >
          <div className="flex flex-col gap-8 w-full font-['Gilroy-SemiBold'] items-start p-3">
            <div className="col-span-6 sm:col-span-3">
              <form className="mt-5">
                <div className="grid  grid-cols-2 gap-6">
                  <div>
                    <label className="block py-3 text-black">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`flex items-center p-2 border rounded-md bg-[#80d7421c] ${
                        firstNameError ? "border-red-500" : ""
                      }`}
                    >
                      <input
                        required
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setFirstName(inputValue);
                          setFirstNameError(
                            isValidName(inputValue) ? "" : "Invalid input"
                          );
                        }}
                        placeholder="Enter First Name"
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                    </div>
                    {firstNameError && (
                      <p className="text-red-500 text-sm mt-1">
                        {firstNameError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block py-3 text-black">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`flex items-center p-2 border rounded-md bg-[#80d7421c] ${
                        lastNameError ? "border-red-500" : ""
                      }`}
                    >
                      <input
                        required
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          setLastName(inputValue);
                          setLastNameError(
                            isValidName(inputValue) ? "" : "Invalid input"
                          );
                        }}
                        placeholder="Enter Last Name"
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                    </div>
                    {lastNameError && (
                      <p className="text-red-500 text-sm mt-1">
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div>
                    <label className="block py-3 text-black">
                       Address<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                      <input
                        required
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setAddressError(""); // Clear the error when user starts typing again
                        }}
                        className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                      />
                      {addressError && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="grid  grid-cols-2 gap-6">
                    <div>
                      <label className="block py-3 text-black">
                        Select Country
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <div className="w-full">
                          <select
                            className="w-full bg-[#80d7421c] p-1"
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
                      <label className="block py-3 text-black">
                        Select State
                      </label>
                      <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                        <div className="w-full">
                          <select
                            className="w-full bg-[#80d7421c] p-1"
                            value={selectedState}
                            onChange={handleStateChange}
                          >
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
                        <select
                          className="w-full bg-[#80d7421c] p-1"
                          value={selectedCity}
                          disabled={!selectedState}
                          onChange={handleCityChange}
                        >
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
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy{" "}
                  </span>
                </p>
                <Button
                  label="Continue"
                  classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                  handleClick={handleAddressVerify}
                />
                <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3 cursor-pointer">
                  Already have an account?{" "}
                  <span
                    className="font-semibold cursor-pointer underline hover:text-[#5AB344] "
                    onClick={() => navigate("/vendor-signIn")}
                  >
                    Sign in
                  </span>{" "}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressVerify;
