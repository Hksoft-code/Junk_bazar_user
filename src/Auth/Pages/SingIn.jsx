import React, { useState } from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input.jsx";
import Button from "../../Components/auth/Button.jsx";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SmallSignIn from "./SmallSignIn.jsx";
import { loginUser } from "../../Services/user.js";
import showErrorMessage from "../../utils/ErrorAlert.jsx";
import "../style.css/auth.css";

const SignIn = () => {
  const navigate = useNavigate();
  // const [checked, setChecked] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const SignInService = async () => {
    // console.log("checked", checked);
    try {
      // if (!checked) {
      //   showErrorMessage("Select Term And Condition", "error");
      //   return;
      // }
      // console.log("phone number ", phoneNumber.slice(3, 13));
      const mobile = phoneNumber.slice(3, 13);
      const dialCode = phoneNumber.slice(0, 3);
      const userResp = await loginUser(dialCode, mobile);
      // console.log("user login from Service File", userResp);
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
    <>
      <SmallSignIn />
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
          <div className="max-w-xl max-h-min ">
            <div class="shadow-xl rounded-lg shadow-[#66666680] p-20 ">
              <header class="p-4">
                <div className="flex flex-col gap-3  items-start">
                  <div className="text-3xl font-bold font-['Gilroy-ExtraBold'] text-[#333333]">
                    Login
                  </div>
                  <div className="text-2xl text-[#707070]">
                    Login into your account
                  </div>
                </div>
              </header>

              <section>
                <p className="mt-20 text-lg leading-8 text-gray-600">
                  Phone Number
                </p>

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

                <div className="mt-10"></div>
              </section>

              <footer class="p-4">
                {/* <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                   <p className="text-[14px] text-[#666666] font-semibold mt-24 mb-5">  */}
                {/* <Input
                      type="checkbox"
                      classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                      value={checked}
                      handleChange={() => setChecked((prevState) => !prevState)}
                    />
                    By creating an account, I agree to our{" "}
                    <span className="underline cursor-pointer">
                      Terms of use
                    </span>{" "}
                    and{" "}
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        navigate("/terms-condition", {
                          state: {
                            from_page: "signIn",
                          },
                        });
                      }}
                    >
                      Privacy Policy{" "}
                    </span> */}
                {/* </p> 
                </div> */}
                <Button
                  label="Continue"
                  classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                  handleClick={SignInService}
                />

                <p className="text-[14px] text-[#4A4A4A] mt-2 text-center font-[400] cursor-pointer">
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/sign-up")}
                    className="text-[#81D742] hover:font-semibold hover:underline cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
