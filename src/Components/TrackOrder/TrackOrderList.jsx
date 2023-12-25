import { useEffect, useState } from "react";
import axiosInstance from "../../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
const OrdersRespEnum = {
    0: "Order In Pending",
    1: "Orders Accpeted",
    2: "Vendor On the Way",
    3: "Vendor Arrived",
    4: "Vendor Picked The Scrap",
    5: "Vendor rejected Your Order"
}
const TrackOrderList = () => {

    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/getUserOrder');
            const scrapList = JSON.parse(response.data.data);
            console.log('orderList', scrapList);
            setOrderList(scrapList.orders)
            // Initialize quantity state with default value   

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleTrackOrder = (event) => {
        console.log("tracking order id", event)
        const orderId = event;
        navigate("/trackOrderDetails", {
            state: {
                orderId
            }
        })
    }


    return (
        <div className="w-full mt-32 flex justify-center items-center lg:max-w-[1100px] mx-auto">

            <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">
                {orderList?.map((cart, index) => (
                    <div key={index} className="w-full max-sm:h-[250px] h-[300px] md:h-auto bg-lime-300  mt-[10px] mb-[10px] flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                        <div className="flex justify-center items-center mb-4 md:mb-0">
                            <img
                                className="w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] object-cover mr-[20px]  max-er:w-[120px] max-er:h-[120px] rounded-[10px]"
                                src={cart?.scrapInfo.docUrl}
                                alt=""
                            />

                            <div>
                                <span className="font-bold text-[12px] max-er:text-[15px] md:text-[12px] bg-[#81D742]  text-white p-3">
                                    {OrdersRespEnum[cart.orderStatus]}
                                </span>
                                <h3 className="font-bold text-[20px] max-er:text-[20px] md:text-[30px] text-white">
                                    {cart?.scrapInfo.scrapName}
                                </h3>
                                <div className="flex items-center text-white">

                                    <p> {cart?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => navigate("/pricing", { replace: true })} className="bg-white lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                                Browse More Scraps
                            </button>
                            <button onClick={() => handleTrackOrder(cart.orderId)} className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrackOrderList;