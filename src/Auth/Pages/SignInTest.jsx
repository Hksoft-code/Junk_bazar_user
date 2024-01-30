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

const SignInTest = () => {
    const navigate = useNavigate();

    const [checked,
        setChecked] = React.useState(true);
    const [phoneNumber,
        setPhoneNumber] = useState("");
    const [isValidPhoneNumber,
        setIsValidPhoneNumber] = useState(false);

    const [value, setValue] = useState()

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        const phoneRegex = /^\d{10}$/;
        const isValid = phoneRegex.test(value);

        setPhoneNumber(value);
        setIsValidPhoneNumber(isValid);
    };

    const SignInService = async () => {
        // console.log("phone number ", phoneNumber.slice(3, 13))
        const mobile = phoneNumber.slice(3, 13)
        try {
            const payLoad = {
                dialCode: "+91",
                phoneNumber: mobile
            };

            const response = await axiosInstance.post("/login", payLoad);

            const dataObj = response.data;

            // console.log("sign in resp dataObj", dataObj);

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
        <div
            id="CustomerRoot"
            className="overflow-hidden bg-white flex flex-row justify-between pr-5 w-full font-['Gilroy-Medium'] items-start"
        >
            <div className="flex flex-col gap-6 w-1/2 items-start mt-10 mb-[-68px]">
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
                    className="-mt-10"
                    src="https://file.rendit.io/n/Hg4qcVTUxAZcSfagaPln.png"
                    alt="Customer"
                    id="Customer"
                />
            </div>
            <div
                id="SignUpNow1"
                className="shadow-[-9px_39px_56px_0px_rgba(0,_0,_0,_0.15)] bg-white flex flex-col justify-between  w-2/5 h-[651px] items-start pt-5 pb-5 pl-10 rounded-[24px]"
            >


                <div className="flex flex-col gap-8 w-full font-['Gilroy-SemiBold'] items-start p-3">
                    <div className="col-span-6 sm:col-span-3">
                        <form className="mt-5">
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
                            <p className="text-[14px] text-[#666666] font-semibold pt-20 mb-5">
                                <Input
                                    type="checkbox"
                                    classname="w-[18px] h-[18px] bg-[#5AB344] mr-2 translate-y-1 cursor-pointer"
                                    value={checked}
                                    checked={checked}
                                    handleChange={() => setChecked((prevState) => !prevState)}
                                />{" "}
                                By creating an account, I agree to our
                                <span className="underline cursor-pointer">
                                    Terms of use
                                </span> and{" "}
                                <span className="underline cursor-pointer">Privacy Policy </span>
                            </p>
                            <Button
                                label="Continue"
                                classname="font-semibold text-[19px] p-[2] text-center bg-[#5AB344] w-full text-white rounded-[27px] outline-none border-none h-[55px] hover:opacity-80"
                                handleClick={SignInService}

                            />
                            <p className="text-[#333333] text-[16px] font-[400] text-center mt-5 -mb-3 cursor-pointer">
                                Already have an account?{" "}
                                <span
                                    className="font-semibold cursor-pointer underline hover:text-[#5AB344]"
                                    onClick={() => navigate("/vendor-signIn")}
                                >
                                    Sign in
                                </span>{" "}
                            </p>
                        </form>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default SignInTest;