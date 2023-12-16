import {
    useEffect, useState
} from "react";
// import {
//     CiLocationOn 
// } from "react-icons/ci";
import {
    useSelector
} from "react-redux";
import {
    serverUrl
} from "../api-config/config";
import api from "../api-config/axiosInstance";
import {
    useNavigate
} from "react-router-dom";
import card from "../assets/PNG/cart.png";
import Swal from "sweetalert2";

const CartList = () => {
    const readCart = useSelector((state) => state.cart);
    const [scrapList, setScrapList] = useState([]);
    const [quanty, setQuantity] = useState(0)

    const navigate = useNavigate();

    const [count, setCount] = useState(0); // useState returns a pair. 'count' is the current state. 'setCount' is a function we can use to update the state.

    function increment() {
        //setCount(prevCount => prevCount+=1);
        setCount(function (prevCount) {
            return (prevCount += 1);
        });
    }

    function decrement() {
        setCount(function (prevCount) {
            if (prevCount > 0) {
                return (prevCount -= 1);
            } else {
                return (prevCount = 0);
            }
        });
    }
    const fetchData = async () => {
        try {
            const response = await api.get(`${serverUrl}/getAddToCart`);

            console.log("Get Scrap ", response);
            const scrapList = JSON.parse(response.data.data);

            console.log("Get Scrap List", scrapList);
            // const list = scrapList;

            setScrapList(scrapList.cartLists);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const removeFromCard = async (event) => {
        console.error("Error fetching data:", event);
        const payload = {
            addToCartId: event,
        };
        try {
            const response = await api.post(`${serverUrl}/removeFormCart`, payload);

            console.log("Scrap Delete ", response);
            const data = response.data;
            if (data.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: data.message
                });
                window.location.reload();
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleRequestPickup = async (event) => {
        console.log("Slected For Pickup", event);

        if (quanty > 0) {

            const payload = {
                addScrapQuantity: quanty,
                scrapId: event
            }

            try {
                const response = await api.get(`${serverUrl}/addScrapQuantity`, payload);
                console.log(" Quantity Added", response);
                const data = response.data;
                if (data.statusCode === 200) {
                    Swal.fire({
                        icon: "success",
                        position: "center",
                        showConfirmButton: false,
                        timer: 2500,
                        title: data.message
                    });
                    window.location.reload();
                }
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }

            navigate("/request_pickup", {
                state: {
                    id: event
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                position: "center",
                showConfirmButton: false,
                timer: 2500,
                title: "Add Quantity"
            });
        }


    };

    const handleCount = (event) => {
        console.log("final count", event)
        if (event > 0) {
            setQuantity(event);
        }
    }

    console.log("this is readCart", readCart);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    return (
        <div className="w-full mt-32 flex justify-center items-center lg:max-w-[1100px] mx-auto">

            <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">

                {scrapList && scrapList.length > 0 ? (
                    scrapList.map((cart, index) => (
                        <div>
                            <button className="bg-red-400 p-2 rounded items-end text-white text-right justify-end" onClick={() => { removeFromCard(cart.addToCartId) }}>Cross</button>
                            <div key={index} className="w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px] mb-[10px] flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12">

                                <div className="flex justify-center items-center mb-4 md:mb-0">
                                    <img
                                        className="w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] object-cover mr-[20px]  max-er:w-[120px] max-er:h-[120px] rounded-[10px]"
                                        src={cart?.docUrl}
                                        alt=""
                                    />
                                    <div>
                                        <h5 className="font-bold text-[20px] max-er:text-[20px] md:text-[30px] text-gray-700">
                                            {cart?.scrapInfo.scrapName}
                                        </h5>
                                        {/* <div className="flex items-center">
                                        <p className="text-green-600">
                                            <CiLocationOn />
                                        </p>
                                        <p> {cart?.address}</p>
                                    </div> */}
                                        <p className="font-bold text-[10px] max-er:text-[10px] md:text-[14px] text-gray-700">
                                            ₹ {cart?.scrapInfo.price} - {cart?.scrapInfo.quantityType}
                                        </p>

                                        <div class="flex items-center justify-center">
                                            <button id="decrement-btn" onClick={decrement}
                                                class="flex justify-center items-center w- h-10 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                                </svg>
                                            </button>
                                            <span id="counter" class="text-4xl font-bold mx-4" onChange={handleCount(count)}>{count}</span>
                                            <button id="increment-btn" onClick={increment}
                                                class="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <button onClick={() => navigate("/pricing", {
                                        replace: true
                                    })} className="lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                                        Browse More Scraps
                                    </button>
                                    <button onClick={() => handleRequestPickup(cart.scrapId,)} className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                                        Request Pickup
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="container mx-auto max-w-sm w-full  sm:w-1/2">
                        <div className="card flex flex-col justify-center p-10 rounded-lg ">
                            <div className="prod-img">
                                <img src={card}
                                    className="w-full object-cover object-center" />
                            </div>
                            <div className="prod-info grid gap-10">
                                <div>
                                    <p>You don’t have any scrap in your cart</p>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-gray-900">
                                    <button onClick={() => navigate("/pricing", {
                                        replace: true
                                    })}
                                        className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full   border-2 border-lime-500 focus:outline-none">
                                        Browse Scraps</button>
                                    <button onClick={() => navigate("/pricing", {
                                        replace: true
                                    })}
                                        className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full bg-lime-500  border-2 border-lime-500 focus:outline-none">
                                        Return To Home</button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>
    );
};

export default CartList;