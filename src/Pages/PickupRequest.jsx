import {
    useEffect, useState
} from "react";
import phone_guy from "../assets/PNG/about-img.png";
import {
    serverUrl
} from "../api-config/config.js";
// import Nav from "../Common/Navbar/Nav";
// import Footer from "../Common/Footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";

const RequestPickup = () => {
    const [formData,
        setFormData] = useState({
            address: "gdh",
            city: "Aj",
            fullName: "David",
            landmark: "gdh",
            phoneNumber: "+2349135914309",
            pincode: "123456",
            price: 1000,
            quantity: 5,
            scrapItem: "65469caa8bd30784068e1bcc"
        });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleConfirm = async () => {
        const dataPayload = {
            address: formData.address,
            city: formData.city,
            fullName: formData.fullName,
            landmark: formData.landmark,
            phoneNumber: formData.phoneNumber,
            pincode: formData.pincode,
            price: formData.price,
            quantity: formData.quantity,
            scrapItem: formData.scrapItem
        };

        const headers = {
            Authorization: `Bearer ${token}`,
            platform: "web"
        };

        await axios
            .post(`${serverUrl}/addPickUpAddress`, dataPayload, {
                headers: headers
            })
            .then((res) => {
                const data = res.data;

                if (data.statusCode === 200) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        showConfirmButton: true,
                        timer: 2500,
                        title: data.message
                    });
                    // return <Redirect to='/otp-verify' />
                }

                console.log("ffdgfdfg", res);
            })

            .catch((error) => {
                console.log("Data", error.response.data);

                if (error.response) {
                    // If server responded with a status code for a request 
                    console.log("Data", error.response.data);
                    const data = error.response.data;

                    if (data.error.statusCode === 400) {
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
        // try {
        //     const response = await axios.post(`${serverUrl}/addPickUpAddress`,
        //         dataPayload,

        //         {
        //             headers: {
        //                 "Access-Control-Allow-Origin": "*",
        //                 Authorization: `Bearer ${token}`,
        //                 'platform':'web'
        //             },
        //         }
        //     );
        //     console.log(response, ">>>");
        // } catch (error) {
        //     console.error(error);
        //     const data = error.response.data;
        //     if(data.error.statusCode == 400){
        //         Swal.fire({
        //             position: "center",
        //             icon: "error",
        //             title: data.error._message,
        //             showConfirmButton: false,
        //             timer: 2500,
        //         });
        //     }
        // }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const inputs = [
        {
            label: "Full Name",
            name: "fullName",
            placeholder: "full name",
            type: "text",
            value: formData.fullName
        },
        {
            label: "Phone Number",
            name: "phoneNumber",
            placeholder: "Phone Number",
            type: "number",
            value: formData.phoneNumber
        },
        {
            label: "Pincode",
            name: "pincode",
            placeholder: "Pincode",
            type: "number",
            value: formData.pincode
        },
        {
            label: "Address",
            name: "address",
            placeholder: "Address",
            type: "text",
            value: formData.address
        },
        {
            label: "Land Mark",
            name: "landmark",
            placeholder: "land mark",
            type: "text"
        },
        {
            label: "City",
            name: "city",
            placeholder: "City",
            type: "text",
            value: formData.city
        },
        {
            label: "Scrap Item",
            name: "scrapItem",
            placeholder: "item id",
            type: "text",
            value: formData.scrapItem
        },
        {
            label: "Price",
            name: "price",
            placeholder: "price",
            type: "number",
            value: formData.price
        },
        {
            label: "Quantity",
            name: "quantity",
            placeholder: "quantity",
            type: "number",
            value: formData.quantity
        }
    ];

    return (
        <div>

            <div className="w-full flex justify-center items-center p-4 md:mt-[150px] sm:mt-[20px] mt-14 ">
                <div className="flex flex-col md:flex-row justify-between items-start w-full md:w-[80%] flex-wrap">
                    <div className="w-full md:w-[40%] h-[300px] md:h-auto">
                        <img
                            src={phone_guy}
                            alt="Map"
                            className="inset-0 w-full h-full object-cover sm:object-contain"
                        />
                    </div>
                    <div className="w-full md:w-[50%] mb-4 md:mb-0 shadow-lg p-[20px]">
                        <div className="w-[100%] p-[10px]">
                            <h1 className="text-[45px] font-bold text-black text-center">
                                Request Pickup
                            </h1>
                        </div>
                        {inputs.map((input) => (
                            <div className="col-span-6 sm:col-span-3" key={input.name}>
                                <div>
                                    <label className="block py-3 text-black">{input.label}</label>
                                    <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                                        <input
                                            type={input.type}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            value={formData[input.name]}
                                            onChange={handleChange}
                                            className="w-full p-1 ml-3 text-black outline-none bg-transparent "
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <br />
                        <div className="w-[100%]">
                            <p className="text-right text-red-400 cursor-pointer">
                                Forgot Password?
                            </p>
                        </div>
                        <br />
                        <div className="col-span-6 sm:col-span-3">
                            <button
                                onClick={handleConfirm}
                                className="w-full h-[50px] text-white font-extrabold bg-[#81D742] rounded-[30px]"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default RequestPickup;
