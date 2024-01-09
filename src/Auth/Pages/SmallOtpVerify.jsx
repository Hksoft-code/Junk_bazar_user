import userImage from "../../assets/PNG/smallUserImag.png";
import React, { useState } from "react";
import Button from "../../Components/auth/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../Components/auth/Input";
import OTPInput from "react-otp-input";
import showErrorMessage from "../../utils/ErrorAlert";
import showSuccessMessage from "../../utils/SweetAlert";
import { otpVerifyService, resendOtpService } from "../../Services/user";

const SmallOtpVerify = () => {
  const [checked, setChecked] = React.useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log("phoneNumberObj", location.state);

  const otpVerify = async () => {
    try {
      // if (!checked) {
      //   showErrorMessage("Select Term And Condition", "error");
      //   return;
      // }
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
    <div className="small-devices ">
      <div className="pl-10 pr-10 mx-auto">
        <img src={userImage} className="w-[300px] h-[300px] " alt="" />
      </div>

      <div className="bg-white -mt-5 p-5 rounded-t-lg shadow-2xl shadow-slate-900">
        <div className=" w-full">
          <p className="mt-1 leading-8 text-gray-600 font-bold text-xl hidden">
            Please Enter OTP
          </p>
          <div>
            <p className="text-[24px] font-semibold"> Sign In now</p>
          </div>
          <p className="mt-4 text-sm leading-8 text-gray-600">Enter OTP</p>
          <OTPInput
            inputStyle={{
              width: "2.5rem",
              background: "rgba(90,179,68,0.24)",
              height: "2rem",
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

          <div className="mt-20"></div>
          <div className="flex flex-row items-start justify-start  ">
            <p className="text-[8px] text-[#666666] font-semibold mt-2 mb-5">
              We’ve sent a one Time password (OTP to +91
              {location?.state?.mobile}
              ). Please enter it to complete verification. Didn’t receive code?
              RESEND CODE
            </p>
          </div>
          <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
            {/* <div className="text-[10px] text-[#666666] font-semibold flex items-center justify-center">
              <div className="flex justify-center items-center">
                <Input
                  type="checkbox"
                  classname="w-[17px] h-[17px] bg-[#5AB344] mr-1 translate-y-1 cursor-pointer mobileotpverification"
                  value={checked}
                  checked={checked}
                  handleChange={() => setChecked((prevState) => !prevState)}
                />
              </div>
              <span className="mt-[8px]">
                <span>By creating an account, I agree to our </span>
                <span className="underline cursor-pointer">
                  Terms of use
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer">
                  Privacy Policy{" "}
                </span>
              </span>
            </div> */}
          </div>
          <Button
            label="Continue"
            classname="mt-4 font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
            handleClick={otpVerify}
          />
          <div className="relative text-center mt-2">
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
              className="[text-decoration:underline]"
            >
              {"Log in  "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallOtpVerify;
