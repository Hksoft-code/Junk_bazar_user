import axios from "axios";
import React, {
    useState 
} from "react";
import customer from "../../assets/PNG/customer.png";
import Input from "../../Components/auth/Input.jsx";
import LabeledInput from "../../Components/auth/LabeledInput.jsx";
import Button from "../../Components/auth/Button.jsx";
// import Swal from "sweetalert2";
import {
    serverUrl 
} from "../../api-config/config";
import {
    useNavigate 
} from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
    const navigate = useNavigate();
   
    const [ checked,
        setChecked ] = React.useState(true);
    const [ phoneNumber,
        setPhoneNumber ] = useState("");

    const Sign_Up = async () => {
        const data = {
            dialCode: "+91",
            phoneNumber: phoneNumber
        };

        const headers = {
            platform: "web"
        };

        await axios
            .post(`${serverUrl}/register`, data, {
                headers: headers 
            })
            .then((res) => {
                const data = res.data;

                if (data.statusCode === 200){
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        showConfirmButton: true,
                        timer: 2500,
                        title: data.message
                    });
                    // return <Redirect to='/otp-verify' />
                }

                console.log(res);
            })

            .catch(error => {
                if (error.response) {
                    // If server responded with a status code for a request 
                    console.log("Data", error.response.data);
                    const data = error.response.data;

                    if (data.error.statusCode === 409) {
                        const mess = data.error;

                        Swal.fire({
                            icon: "error",
                            position: "center",
                            showConfirmButton: false,
                            timer: 2500,
                            title: mess._message
                        });
                    }

                    console.log("Status", error.response.status);
                    console.log("Headers", error.response.headers);
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
                // Error handling here 
            });
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2 lg:grid-cols-2">
                <div className="w-full text-center">
                    {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2> */}
                    <p className="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                    <img className="h-full w-full rounded-full" src={customer} alt=" " />
                </div>
                <div className="w-full">
                    <div className="shadow-md p-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Enter Phone Number.</p>

                        <p className="mt-6 text-sm leading-8 text-gray-600">Phone number</p>
                        <LabeledInput
                            handleChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />

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
                            handleClick={Sign_Up}

                        />
                        <div className="relative text-center mt-10">
                            <span className="text-darkslategray-200">
                                Already have an account?
                            </span>
                            <span className="text-dimgray-200">{" "}</span>
                            <span onClick={() => navigate("sign-in")} className="[text-decoration:underline]">{"Log in  "}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;

// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploader = () => {
//   const [image, setImage] = useState(null);
//   const [imageName, setImageName] = useState('');
//   const [imageType, setImageType] = useState('');
//   const [signedUrl, setSignedUrl] = useState('');

//   const handleFileChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleUpload = async () => {
//     // Ensure an image is selected
//     if (!image) {
//       alert('Please select an image.');
//       return;
//     }

//     // Send image name and type to the server to get a signed URL
//     try {
//       const response = await axios.post('http://your-server-url/getSignedUrl', {
//         imageName,
//         imageType,
//       });

//       // Extract the signed URL from the response
//       const { signedUrl } = response.data;
//       setSignedUrl(signedUrl);

//       // Upload the image to the signed URL with the correct Content-Type
//       const uploadResponse = await fetch(signedUrl, {
//         method: 'PUT',
//         body: image,
//         headers: {
//           'Content-Type': image.type, // Set the Content-Type header based on the image type
//         },
//       });

//       console.log('Image uploaded successfully:', uploadResponse);

//       // Handle success, display a message, or update your UI as needed
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       // Handle error, display an error message, or update your UI as needed
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Image Name"
//         value={imageName}
//         onChange={(e) => setImageName(e.target.value)}
//       />
//       <br />
//       <input
//         type="text"
//         placeholder="Image Type"
//         value={imageType}
//         onChange={(e) => setImageType(e.target.value)}
//       />
//       <br />
//       <input type="file" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload}>Upload Image</button>

//       {signedUrl && <p>Signed URL: {signedUrl}</p>}
//     </div>
//   );
// };

// export default ImageUploader;

