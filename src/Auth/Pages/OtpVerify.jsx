import axios from "axios";
import React, { useState } from "react";
import customer from '../../assets/PNG/customer.png'
import Input from "../../Components/auth/Input";
import LabeledInput from "../../Components/auth/LabeledInput";
import Button from '../../Components/auth/Button'
import Swal from "sweetalert2";
import client from "../../api-config/clients";

const OtpVerify = () => {
    const baseUrl = "https://serverpprod.hksoftware.in/api/v1/users";
    const [checked, setChecked] = React.useState(true);
    const [otp, setOtp] = useState("");


    const verifyOtp = async () => {

        const data = {
            "otp": otp,
            "phoneNumber": "7488325096"
        }

        const headers = {
            "platform": "web",
        };

        await axios
            .post(`${baseUrl}/otpVerify`, data, { headers: headers })
            .then((res) => {
                console.log(res);
                // Swal.fire({
                //     position: "center",
                //     icon: "success",
                //     title: "Product Uploaded successfully ",
                //     showConfirmButton: false,
                //     timer: 2500,
                // });
            })

            .catch((error) => { // error is handled in catch block
                if (error.response) { // status code out of the range of 2xx
                  console.log("Data :" , error.response.data);
                  console.log("Status :" + error.response.status);
                } else if (error.request) { // The request was made but no response was received
                  console.log(error.request);
                } else {// Error on setting up the request
                  console.log('Error', error.message);
                }
              });
    };

    return (
        <div class="bg-white py-24 sm:py-32">
            <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2 lg:grid-cols-2">
                <div class="w-full text-center">
                    {/* <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2> */}
                    <p class="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                    <img class="h-full w-full rounded-full" src={customer} alt=" " />
                </div>
                <div class="w-full">
                    <div className="shadow-md p-8">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                        <p class="mt-6 text-lg leading-8 text-gray-600">Enter OTP</p>

                        <p class="mt-6 text-sm leading-8 text-gray-600">Enter OTP</p>
                        <LabeledInput
                            handleChange={(e) => {
                                setOtp(e.target.value);
                            }}
                        />

                        <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                            <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">
                            We’ve sent a one Time password (OTP to +9134543256783). 
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
                            handleClick={verifyOtp}


                        />
                        <div className="relative text-center mt-10">
                            <span className="text-darkslategray-200">
                                Already have an account?
                            </span>
                            <span className="text-dimgray-200">{` `}</span>
                            <span className="[text-decoration:underline]">{`Log in  `}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    );
};

export default OtpVerify;
