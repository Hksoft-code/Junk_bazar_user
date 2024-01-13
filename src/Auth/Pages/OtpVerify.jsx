import React, { useState } from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input";
import Button from "../../Components/auth/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallOtpVerify from "./SmallOtpVerify.jsx";
import OTPInput from "react-otp-input";
import { IoChevronBackOutline } from "react-icons/io5";
import showSuccessMessage from "../../utils/SweetAlert.jsx";
import { otpVerifyService, resendOtpService } from "../../Services/user.js";
import showErrorMessage from "../../utils/ErrorAlert.jsx";
import "../style.css/auth.css";

const OtpVerify = () => {
  const [checked, setChecked] = React.useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("phoneNumberObj", location.state);

  const otpVerify = async () => {
    try {
      if (!checked) {
        showErrorMessage("Select Term And Condition", "error");
        return;
      }
      const otpVerifyResp = await otpVerifyService(location.state.mobile, otp);
      const userResp = JSON.parse(otpVerifyResp.data);
      console.log("userResp", otpVerifyResp);
      console.log("otpVerifyResp from Service File", userResp);
      console.log("token", userResp.token);
      localStorage.setItem("token", userResp.token);
      showSuccessMessage(otpVerifyResp.message, "success");
      navigate("/pricing", {});
    } catch (error) {
      console.error("Error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showErrorMessage(errorMessage, "error");
    }
  };

  const handleResend = async () => {
    try {
      const otpVerifyResp = await resendOtpService(
        location.state.dialCode,
        location.state.mobile
      );
      showSuccessMessage(otpVerifyResp.message, "success");
      setOtp("");
    } catch (error) {
      console.error("Error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;

      showErrorMessage(errorMessage, "error");
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

              <h2 className=" mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
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
            <div class="shadow-xl rounded-lg shadow-[#66666680] p-20 ">
              <header class="">
                <div className="flex flex-col gap-3  items-start">
                  <div className="text-3xl font-['Gilroy-ExtraBold'] text-[#333333]">
                    Login
                  </div>
                  <div className="text-2xl text-[#707070]">
                    Login into your account
                  </div>
                </div>
              </header>
              <section className="">
                <p className="mt-10 mb-5 leading-8 text-gray-600 font-bold text-xl">
                  Enter OTP
                </p>
                <div className=" p-2 max-w-sm">
                  <OTPInput
                    inputStyle={{
                      width: "3.5rem",
                      background: "rgba(90,179,68,0.24)",
                      height: "2.5rem",
                      margin: "5px 5px",
                      fontSize: "1rem",
                      borderRadius: 4,
                      border: "2px solid #5AB344",
                    }}
                    focusedBorderColor="#5ab344"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div
                  id="OTPSentToRESENDCODE2"
                  className="mt-5 text-center text-[#707070] ml-16 w-3/4 font-['Gilroy-Bold']"
                >
                  OTP sent to{" "}
                  <span>
                    +91 {location.state.mobile}
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
              </section>
              <footer class="p-4">
                <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                  <p className="text-[14px] text-[#666666] font-semibold  mb-1">
                    <Input
                      type="checkbox"
                      classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                      value={checked}
                      checked={checked}
                      handleChange={() => setChecked((prevState) => !prevState)}
                    />
                    By creating an account, I agree to our{" "}
                    <span className="underline cursor-pointer">
                      Terms of use
                    </span>{" "}
                    and{" "}
                    <span className="underline cursor-pointer">
                      Privacy Policy{" "}
                    </span>
                  </p>
                </div>
                <Button
                  label="Continue"
                  classname="cursor-pointer font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                  handleClick={otpVerify}
                />
                <div className="relative text-center mt-2">
                  <span className="text-darkslategray-200">
                    Already have an account?
                  </span>
                  <span className="curser-pointer text-dimgray-200"> </span>
                  <span
                    onClick={() =>
                      navigate("/sign-in", {
                        replace: true,
                      })
                    }
                    className="cursor-pointer [curser-pointer text-decoration:underline]"
                  >
                    {"Log In"}
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
