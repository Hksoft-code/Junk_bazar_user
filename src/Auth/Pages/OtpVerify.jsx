import React, { useState } from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input";
import LabeledInput from "../../Components/auth/LabeledInput";
import Button from "../../Components/auth/Button";

import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance.js";
import SmallOtpVerify from "./SmallOtpVerify.jsx";
import OTPInput from "react-otp-input";
import { IoChevronBackOutline } from "react-icons/io5";
const OtpVerify = () => {
  const [checked, setChecked] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\d{6}$/;
    const isValid = phoneRegex.test(value);

    setOtp(value);
    setIsValidPhoneNumber(isValid);
  };
  const otpVerifyService = async () => {
    if (checked) {
      const payload = {
        otp: otp,
        phoneNumber: location.state.mobile,
      };

      try {
        const resp = await axiosInstance.post("/otpVerify", payload);
        const dataObject = resp.data;
        const tokenParse = JSON.parse(dataObject.data);

        const dataUser = JSON.parse(dataObject.data);
        console.log("token", tokenParse.token);
        localStorage.setItem("token", tokenParse.token);

        const userId = dataUser.userId;

        if (dataUser.isDocumentUploaded === true) {
          if (dataObject.statusCode === 200) {
            console.log("token store ", localStorage.getItem("token"));

            navigate("/pricing", {
              replace: true,
            });
          }
        } else {
          navigate("/addressVerify", {
            state: {
              userId,
            },
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
    } else {
      Swal.fire({
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 2500,
        title: "Select Term And Condition",
      });
    }
  };

  const handleResend = async () => {
    const payload = {
      phoneNumber: location.state.mobile,
    };

    try {
      const resp = await axiosInstance.post("/resendOtp", payload);
      const dataObject = resp.data;

      if (dataObject.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: dataObject.message,
        });

        setOtp("");
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
      <SmallOtpVerify />
      <div class="h-screen md:flex signup-container">
        <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr  i justify-around items-center hidden sm:block">
          <div className="w-full text-center  ">
            <div className="flex flex-row gap-2">
              <Link to="/">
                <IoChevronBackOutline className="ml-12 w-12 h-12 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200" />
              </Link>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
                Welcome To <span className="text-lime-600">JunkBazar</span>
              </h2>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600 ">
              Sign In to enjoy exclusive access!.
            </p>
            <img
              className="max-w-lg mx-auto mt-4 rounded-full"
              src={customer}
              alt=" "
            />
          </div>
        </div>
        <div class="flex md:w-1/2  justify-center py-5 items-center bg-white">
          <div className="max-w-xl max-h-screen ">
            <div className="shadow-xl p-10 w-full">
              <div className="flex flex-col gap-3  items-start">
                <div className="font-bold text-3xl font-['Gilroy-ExtraBold'] text-[#333333]">
                  Login
                </div>
                <div className="text-2xl text-[#707070]">
                  Login into your account
                </div>
              </div>
              <p className="mt-20 leading-8 text-gray-600 font-bold text-xl">
                Enter OTP
              </p>

              {/* <input
                                className="border rounded-[12px] mt-1 bg-white w-full p-3 outline-none text-[16px]"
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                onChange={handlePhoneNumberChange}
                            /> */}

              <OTPInput
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "20px 1rem",
                  fontSize: "1rem",
                  borderRadius: 4,
                  border: "2px solid rgba(0,0,0,0.3)",
                }}
                focusedBorderColor="#5ab344"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />

              {/* {isValidPhoneNumber || (
                                <p className="text-red-500 text-sm">
                                    Please enter a valid 6-digit OTP.
                                </p>
                            )} */}

              <div
                id="OTPSentToRESENDCODE2"
                className=" text-center text-[#707070] ml-16 w-3/4 font-['Gilroy-Bold']"
              >
                OTP sent to{" "}
                <span>
                  +91 {location?.state?.mobile}
                  <br />
                </span>
                <span
                  onClick={handleResend}
                  className="cursor-pointer  underline text-[#5ab344]"
                >
                  RESEND CODE
                </span>
              </div>
              <div className="mt-20"></div>
              <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                <div className="text-[14px] text-[#666666] font-semibold  mb-1 flex items-center">
                  <Input
                    type="checkbox"
                    classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                    value={checked}
                    checked={checked}
                    handleChange={() => setChecked((prevState) => !prevState)}
                  />
                  <span className="mt-2">
                  By creating an account, I agree to our{" "}
                  <span className="underline cursor-pointer">Terms of use</span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy{" "}
                  </span>
                  </span>
                </div>
              </div>
              <Button
                label="Continue"
                classname="cursor-pointer font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                handleClick={otpVerifyService}
              />
              <div className="relative text-center mt-10">
                <span className="text-darkslategray-200">
                  Already have an account?
                </span>
                <span className="text-dimgray-200"> </span>
                <span
                  onClick={() =>
                    navigate("/sign-in", {
                      replace: true,
                    })
                  }
                  className="text-decoration:none cursor-pointer"
                >
                  {"Sign In  "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
