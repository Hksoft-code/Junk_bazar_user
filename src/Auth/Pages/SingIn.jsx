import React, {
    useState
} from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input.jsx";
import LabeledInput from "../../Components/auth/LabeledInput.jsx";
import Button from "../../Components/auth/Button.jsx";
import Swal from "sweetalert2";

import {
    useNavigate
} from "react-router-dom";
import flag from '../../assets/PNG/fllag.png'
import axiosInstance from "../../api-config/axiosInstance.js";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import SmallSignIn from "./SmallSignIn.jsx";

const SignIn = () => {
    const navigate = useNavigate();

    const [checked,
        setChecked] = React.useState(true);
    const [phoneNumber,
        setPhoneNumber] = useState("");
    const [isValidPhoneNumber,
        setIsValidPhoneNumber] = useState(false);


    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const phoneRegex = /^\d{10}$/;
        const isValid = phoneRegex.test(value);

        setPhoneNumber(value);
        setIsValidPhoneNumber(isValid);
    };

    const SignInService = async () => {
        console.log("phone number ", phoneNumber.slice(3, 13))
        const mobile = phoneNumber.slice(3, 13)
        try {
            const payLoad = {
                dialCode: "+91",
                phoneNumber: mobile
            };

            const response = await axiosInstance.post("/login", payLoad);

            const dataObj = response.data;

            console.log("sign in resp dataObj", dataObj);

            if (dataObj.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: response.data.message
                });
                navigate("/otp-verify", {
                    state: {
                        mobile
                    }
                });
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);

            if (error.response) {
                // If server responded with a status code for a request  
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
        }
    };

    return (
        <>
            <SmallSignIn />
            <div class="h-screen md:flex signup-container">
                <div
                    class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr  i justify-around items-center hidden">
                    <div className="w-full text-center ">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-20">Welcome To <span className="text-lime-600">JunkBazar</span></h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 ">Sign In to enjoy exclusive access!.</p>
                        <img className="max-h-fit w-full rounded-full" src={customer} alt=" " />
                    </div>

                </div>
                <div class="flex md:w-1/2  justify-center py-10 items-center bg-white">
                    <div className="max-w-2xl max-h-screen">
                        <div className="shadow-xl p-20 w-full">

                            <p className="mt-6  leading-8 text-gray-600 font-bold text-xl">Sign In</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">Enter Phone Number.</p>

                            <p className="mt-6 text-sm leading-8 text-gray-600">Phone number</p>

                            <div className="border border-l-zinc-600 rounded p-2 max-w-sm">
                                <PhoneInput
                                    international
                                    defaultCountry="IN"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber} />
                            </div>

                            <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                                <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">
                                    <Input
                                        type="checkbox"
                                        classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                                        value={checked}
                                        checked={checked}
                                        handleChange={() => setChecked((prevState) => !prevState)}
                                    />By creating an account, I agree to our {" "}
                                    <span className="underline cursor-pointer">Terms of use</span> and{" "}
                                    <span className="underline cursor-pointer">Privacy Policy </span>
                                </p>
                            </div>
                            <Button
                                label="Continue"
                                classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"

                                handleClick={SignInService}
                            />
                            <div className="relative text-center mt-10">
                                <span className="text-darkslategray-200">
                                    Already have an account?
                                </span>
                                <span className="text-dimgray-200">{" "}</span>
                                <span onClick={() => navigate("/sign-up")} className="[text-decoration:underline]">{"Sign Up  "}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
