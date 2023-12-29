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
import SmallOtpVerify from "./SmallOtpVerify.jsx";
const OtpVerify = () => {
    const [checked,
        setChecked] = React.useState(true);
    const [otp,
        setOtp] = useState("");
    const [isValidPhoneNumber,
        setIsValidPhoneNumber] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    console.log("phoneNumberObj", location.state.mobile);
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
            phoneNumber: location.state.mobile
        };

        try {
            const resp = await axiosInstance.post("/otpVerify", payload);
            const dataObject = resp.data;
            const tokenParse = JSON.parse(dataObject.data);

            const dataUser = JSON.parse(dataObject.data);
            console.log("token", tokenParse.token);
            localStorage.setItem("token", tokenParse.token);

            const userId = dataUser.userId

            if (dataUser.isDocumentUploaded === true) {

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
            } else {
                navigate("/addressVerify", {
                    state: {
                        userId
                    }
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
        <>
            <SmallOtpVerify />
            <div class="h-screen md:flex signup-container">

                <div className="flex flex-col gap-6 w-1/2 items-start mt-10 ">
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
                        className="-mt-20"
                        src="https://file.rendit.io/n/Hg4qcVTUxAZcSfagaPln.png"
                        alt="Customer"
                        id="Customer"
                    />
                </div>
                <div class="flex md:w-1/2  justify-center py-5 items-center bg-white">
                    <div className="max-w-xl max-h-screen">
                        <div className="shadow-lg p-10 w-full">

                            <p className="mt-2  leading-8 text-gray-600 font-bold text-xl">Please Enter OTP</p>
                            <p className="mt-2 text-lg leading-8 text-gray-600">Enter OTP</p>

                            <p className="mt-2 text-sm leading-8 text-gray-600">Enter OTP</p>
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
                                    We’ve sent a one Time password (OTP to +91{location.state.mobile}).
                                    Please enter it to complete verification.
                                    Didn’t receive code? RESEND CODE

                                </p>
                            </div>
                            <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                                <p className="text-[14px] text-[#666666] font-semibold  mb-1">
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
        </>
    );
};

export default OtpVerify;
