import React, {
    useState
} from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input";
import LabeledInput from "../../Components/auth/LabeledInput";
import Button from "../../Components/auth/Button";

import Swal from "sweetalert2";
import {
    useLocation, useNavigate
} from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance.js";
const OtpVerify = () => {
    const [checked,
        setChecked] = React.useState(true);
    const [otp,
        setOtp] = useState("");
    const [isValidPhoneNumber,
        setIsValidPhoneNumber] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    console.log("phoneNumberObj", location.state.phoneNumber);
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const phoneRegex = /^\d{6}$/;
        const isValid = phoneRegex.test(value);

        setOtp(value);
        setIsValidPhoneNumber(isValid);
    };
    const otpVerifyService = async () => {
        const payload = {
            otp: otp,
            phoneNumber: location.state.phoneNumber
        };

        try {
            const resp = await axiosInstance.post("/otpVerify", payload);
            const dataObject = resp.data;
            const tokenParse = JSON.parse(dataObject.data);

            console.log("token", tokenParse.token);
            localStorage.setItem("token", tokenParse.token);

            if (dataObject.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: dataObject.message
                });
                console.log("token store ", localStorage.getItem("token"));

                navigate("/pricing", {
                    replace: true
                });
            }
        }
        catch (error) {
            console.error("Error", error);

            if (error.response) { // status code out of the range of 2xx
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: error.response.data.error._message
                });

                console.log("Status :" + error.response.status);
            }
            else if (error.request) { // The request was made but no response was received
                console.log(error.request);
            }
            else {// Error on setting up the request
                console.log("Error", error.message);
            }
        }
    };

    return (
        <div class="h-screen md:flex">

            <div
                class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr  i justify-around items-center hidden">
                <div className="w-full text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To <span className="text-lime-600">JunkBazar</span></h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Sign In to enjoy exclusive access!.</p>
                    <img className="max-h-fit w-full rounded-full" src={customer} alt=" " />
                </div>

            </div>
            <div class="flex md:w-1/2  justify-center py-10 items-center bg-white">
                <div className="max-w-2xl max-h-screen">
                    <div className="shadow-lg p-20 w-full">

                        <p className="mt-6  leading-8 text-gray-600 font-bold text-xl">Please Enter OTP</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Enter OTP</p>

                        <p className="mt-6 text-sm leading-8 text-gray-600">Enter OTP</p>
                        <LabeledInput
                            type='number' inputMode='numeric' pattern="[0-9]*"
                            maxlength="6"
                            handleChange={handlePhoneNumberChange}
                        />
                        {!isValidPhoneNumber && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid 6-digit Otp.</p>
                        )}
                        <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                            <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">
                                We’ve sent a one Time password (OTP to +91{location.state.id}).
                                Please enter it to complete verification.
                                Didn’t receive code? RESEND CODE

                            </p>
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
                            disabled={!isValidPhoneNumber}
                            handleClick={otpVerifyService}

                        />
                        <div className="relative text-center mt-10">
                            <span className="text-darkslategray-200">
                                Already have an account?
                            </span>
                            <span className="text-dimgray-200">{" "}</span>
                            <span onClick={() => navigate("/sign-in", {
                                replace: true
                            })} className="[text-decoration:underline]">{"Log in  "}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;
