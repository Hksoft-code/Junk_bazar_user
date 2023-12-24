import { useLocation, useNavigate } from 'react-router-dom'
import React, {
    useState
} from "react";
import step1 from '../../assets/PNG/step1.png'
import step2 from '../../assets/PNG/step2.png'
import step3 from '../../assets/PNG/step3.png'
import step4 from '../../assets/PNG/step4.png'
import tick_green from '../../assets/PNG/tick_green.png'
import tick_grey from '../../assets/PNG/tick_grey.png'
import Button from '../auth/Button'
import Nav from '../../Common/Navbar/Nav'
import Footer from '../../Common/Footer/Footer'
import { useEffect } from 'react'
import axiosInstance from '../../api-config/axiosInstance'

const TrackOrderDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [backendOrderStatus, setOrderStatus] = useState("");
    console.log("phoneNumberObj", location.state.orderId);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/getUserOrderInfo', {
                params: {
                    orderId: location.state.orderId,
                },
            });
            const OrderTrack = JSON.parse(response.data.data);
            console.log('order Track Status', OrderTrack);
            setOrderStatus(OrderTrack.orderStatus)
            // Initialize quantity state with default value   

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const OrdersEnum = {
        ACCEPTED: 1,
        ARRVIED: 3,
        ON_THE_WAY: 2,
        PENDING: 0,
        REJECTED: 5,
        SCRAP_PICKED: 4
    }
    return (
        <div>
            <Nav />
            <div className=" mt-20 lg:mt-32  justify-center items-center lg:max-w-[1250px] mx-auto ">
                <h2 className="mt-5 text-3xl text-center font-extrabold">Pickup Status</h2>
                <div className="pt-[10px] p-10 pb-12 flex flex-col justify-center items-center ">
                    <div className="w-full p-2 mt-12 flex justify-center items-center lg:max-w-[1100px] mx-auto">

                        <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">

                            <div className="mb-10 p-[2.5rem] w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center  py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                                <div className="flex justify-center items-center mb-4 md:mb-0">
                                    <img
                                        className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                                        src={step1}
                                        alt=""
                                    />
                                    <div>
                                        <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                                            Order Accepted
                                        </h3>
                                        <div className="flex items-center">

                                            <p>Our agent has picked your order </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-4">

                                    <img
                                        className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                                        src={backendOrderStatus >= OrdersEnum.ACCEPTED ? tick_green : tick_grey}
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className="mb-10 w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                                <div className="flex justify-center items-center mb-4 md:mb-0">
                                    <img
                                        className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                                        src={step2}
                                        alt=""
                                    />
                                    <div>
                                        <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                                            Agent on the way
                                        </h3>
                                        <div className="flex items-center">

                                            <p>Our agent is on their way to your location</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-4">

                                    <img
                                        className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                                        src={backendOrderStatus >= OrdersEnum.ON_THE_WAY ? tick_green : tick_grey}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="mb-10 w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                                <div className="flex justify-center items-center mb-4 md:mb-0">
                                    <img
                                        className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                                        src={step3}
                                        alt=""
                                    />
                                    <div>
                                        <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                                            Agent Arrived
                                        </h3>
                                        <div className="flex items-center">

                                            <p>Our agent has gotten to your Location</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-4">

                                    <img
                                        className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                                        src={backendOrderStatus >= OrdersEnum.ARRVIED ? tick_green : tick_grey}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="mb-10 w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                                <div className="flex justify-center items-center mb-4 md:mb-0">
                                    <img
                                        className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                                        src={step4}
                                        alt=""
                                    />
                                    <div>
                                        <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                                            Agent Picked up Order
                                        </h3>
                                        <div className="flex items-center">

                                            <p>Agent successfully picked all scraps</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-4">

                                    <img
                                        className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                                        src={backendOrderStatus >= OrdersEnum.SCRAP_PICKED ? tick_green : tick_grey}
                                        alt=""
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="mt-10 flex flex-col md:flex-row mx-auto">
                        <Button
                            handleClick={() => navigate("/pricing", { replace: true })}
                            label="Browse More Scraps"
                            classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] text-[#343434] border border-black outline-none bg-white m-2"
                        />
                        <Button

                            handleClick={() => navigate("/", { replace: true })}
                            label="Return To Home"
                            classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] bg-[#5AB344] text-white m-2"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default TrackOrderDetails;