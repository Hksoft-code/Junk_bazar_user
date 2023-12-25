
// import PhoneInput from "react-phone-number-input";
import userImage from '../../assets/PNG/smallUserImag.png'
import { useState } from "react";
// import OTPInput, { ResendOTP } from "otp-input-react";
// import OtpInput from 'react-otp-input';
import Button from "../../Components/auth/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";
import LabeledInput from "../../Components/auth/LabeledInput";
import Input from "../../Components/auth/Input";
const SmallOtpVerify = () => {
    // const [phoneNumber, setPhoneNumber] = useState("");
    const [otp,
        setOtp] = useState("");

    const [checked,
        setChecked] = useState(true);

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
        <div className="small-devices ">

            <div className="pl-10 pr-10 mx-auto">
                <img src={userImage} className="w-[300px] h-[300px] " alt="" />
            </div>
            <div className="bg-white -mt-5 p-5 rounded-t-lg shadow-2xl shadow-slate-900">
                <div className=" w-full">
                    <p className="mt-1  leading-8 text-gray-600 font-bold text-xl">Please Enter OTP</p>
                    <p className="mt-1 text-sm leading-8 text-gray-600">Enter OTP</p>
                    <LabeledInput
                        type='number' inputMode='numeric' pattern="[0-9]*"
                        maxlength="6"
                        handleChange={handlePhoneNumberChange}
                    />
                    {!isValidPhoneNumber && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid 6-digit Otp.</p>
                    )}
                    <div className="flex flex-row items-start justify-start  ">
                        <p className="text-[8px] text-[#666666] font-semibold mt-2 mb-5">
                            We’ve sent a one Time password (OTP to +91{location.state.mobile}).
                            Please enter it to complete verification.
                            Didn’t receive code? RESEND CODE

                        </p>
                    </div>
                    <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                        <p className="text-[10px] text-[#666666] font-semibold mt-2 mb-5">
                            <Input
                                type="checkbox"
                                classname="w-[14px] h-[14px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
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
                    <div className="relative text-center mt-2">
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


    );
}

export default SmallOtpVerify;