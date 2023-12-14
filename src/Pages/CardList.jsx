import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { serverUrl } from "../api-config/config";
import api from '../api-config/axiosInstance';
import { useNavigate } from "react-router-dom";
import card from '../assets/PNG/cart.png'

const CartList = () => {
    const readCart = useSelector((state) => state.cart);
    const [scrapList, setScrapList] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const response = await api.get(`${serverUrl}/getAddToCart`);

            console.log("Get Scrap ", response)
            const scrapList = JSON.parse(response.data.data);
            console.log("Get Scrap List", scrapList)
            const list = scrapList
            setScrapList(list.cartLists)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleRequestPickup = (event) => {
        console.log("Slected For Pickup", event)

        navigate("/request_pickup", { state: { id: event } })
    }

    console.log("this is readCart", readCart);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    return (
        <div className="w-full mt-32 flex justify-center items-center lg:max-w-[1100px] mx-auto">

            <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">


                <div class="container mx-auto max-w-sm w-full  sm:w-1/2">
                    <div class="card flex flex-col justify-center p-10 rounded-lg ">
                        <div class="prod-img">
                            <img src={card}
                                class="w-full object-cover object-center" />
                        </div>
                        <div class="prod-info grid gap-10">
                            <div>
                                <p>You don’t have any scrap in your cart</p>
                            </div>
                            <div class="flex flex-col md:flex-row justify-between items-center gap-5 text-gray-900">
                                <button
                                    class="px-2 py-2 transition ease-in duration-200 uppercase rounded-full   border-2 border-lime-500 focus:outline-none">
                                    Browse Scraps</button>
                                <button
                                    class="px-2 py-2 transition ease-in duration-200 uppercase rounded-full bg-lime-500  border-2 border-lime-500 focus:outline-none">
                                    Return To Home</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {scrapList?.map((cart, index) => (
                    <div key={index} className="w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px] mb-[10px] flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12">
                        <div className="flex justify-center items-center mb-4 md:mb-0">
                            <img
                                className="w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] object-cover mr-[20px]  max-er:w-[120px] max-er:h-[120px] rounded-[10px]"
                                src={cart?.docUrl}
                                alt=""
                            />
                            <div>
                                <h3 className="font-bold text-[20px] max-er:text-[20px] md:text-[30px] text-gray-700">
                                    {cart?.scrapName}
                                </h3>
                                <div className="flex items-center">
                                    <p className="text-green-600">
                                        <CiLocationOn />
                                    </p>
                                    <p> {cart?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => navigate("/pricing", { replace: true })} className="lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                                Browse More Scraps
                            </button>
                            <button onClick={() => handleRequestPickup(cart.scrapId)} className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                                Request Pickup
                            </button>
                        </div>
                    </div>
                ))} */}


            </div>
        </div>
    );
};

export default CartList;