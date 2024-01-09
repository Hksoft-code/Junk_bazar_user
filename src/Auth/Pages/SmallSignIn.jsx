import PhoneInput from "react-phone-number-input";
import userImage from "../../assets/PNG/smallUserImag.png";
import React, { useState } from "react";
import Button from "../../Components/auth/Button";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import showErrorMessage from "../../utils/ErrorAlert";
import { loginUser } from "../../Services/user";

const SmallSignIn = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const SignInService = async () => {
    console.log("checked", checked);
    try {
      // if (!checked) {
      //   showErrorMessage("Select Term And Condition", "error");
      //   return;
      // }
      console.log("phone number ", phoneNumber.slice(3, 13));
      const mobile = phoneNumber.slice(3, 13);
      const dialCode = phoneNumber.slice(0, 3);
      const userResp = await loginUser(dialCode, mobile);
      console.log("user login from Service File", userResp);
      navigate("/otp-verify", {
        state: {
          mobile,
          dialCode,
        },
      });
    } catch (error) {
      console.error("error", error);
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
      <div className="bg-white p-10 rounded-t-lg shadow-2xl shadow-slate-900">
        <div className="">
          <h2 className="text-[#303030]  text-[22px] mt-2 mb-0">Sign In Now</h2>
        </div>
        <form className="mt-5">
          <div className="border border-l-zinc-600 rounded p-2 max-w-sm">
            <PhoneInput
              maxLength={15}
              className={"input-phone-number"}
              international
              defaultCountry="IN"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          {/* <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
            <p className="text-[14px] text-[#666666] font-semibold mt-10 mb-5">
              <Input
                type="checkbox"
                classname="w-[17px] h-[17px] bg-[#5AB344] mr-1 translate-y-1 cursor-pointer mobileotpverification"
                value={checked}
                checked={checked}
                handleChange={() => setChecked((prevState) => !prevState)}
              />
              By creating an account, I agree to our{" "}
              <span className="underline cursor-pointer">Terms of use</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy </span>
            </p>
          </div> */}
          <div className="mt-40"></div>
          <div className="mt-1">
            <Button
              label="Continue"
              classname="h-[40px] font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none  hover:opacity-80"
              handleClick={SignInService}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmallSignIn;
