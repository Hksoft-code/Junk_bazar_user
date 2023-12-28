import {
    useEffect, useState
} from "react";

import axiosInstance from "../../api-config/axiosInstance.js";
import {
    useNavigate
} from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart, removeFromCart } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const PriceCardComponent = () => {
    const dispatch = useDispatch();
    const itemsInCart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const [scrapList,
        setScrapList] = useState([]);
    const handleApiError = (error) => {
        if (error.response) {
            const {
                status, data
            } = error.response;

            console.log("Error response:", data);

            if (status === 401) {
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: data.error
                });
                navigate("/sign-in");
            }
            else if (status === 400) {
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: "Scrap Already In Cart"
                });
            }
        }
        else if (error.request)
            console.error("Response not received:", error.request);

        else
            console.error("Other error:", error.message);
    };

    async function fetchData() {
        try {
            const response = await axiosInstance.get("/getScrap");
            const {
                scraps
            } = JSON.parse(response.data.data);

            console.log("pricing", scraps);
            setScrapList(scraps);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleAddToCard = async (scrapId) => {
        dispatch(addToCart(scrapId));
        try {
            const AddScrapPayLoad = {
                scrapId
            };
            const response = await axiosInstance.post("/addToCart", AddScrapPayLoad);
            const {
                statusCode
            } = response.data;

            if (statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: "Add To Cart Successful"
                });
            }
        }
        catch (error) {
            handleApiError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderData = () => {
        return scrapList?.map((item) => (


            <div key={item.scrapId} class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">

                <img src={item?.docUrl}
                    alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
                <div class="px-4 py-3 w-72">

                    <p class="text-lg font-bold text-black truncate block capitalize">{item.scrapName}</p>
                    <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto my-3">₹ {item.price}-{item.quantityType}</p>

                        <div class="ml-auto">
                            <button onClick={() => handleAddToCard(item.scrapId)} class="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>





            // <div  className="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            //     <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
            //         <img className="object-cover" src={item?.docUrl} alt="product image" />
            //         <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
            //     </a>
            //     <div className="mt-4 px-5 pb-5">
            //         <div className="opacity-80 text-2xl font-['Gilroy-SemiBold'] text-[#4a4a4a] ">
            //             {item.scrapName}
            //         </div>
            //         {/* <h5 className="text-lg  tracking-tight text-slate-900">{item.scrapName}</h5> */}

            //         <div className="mt-2 mb-5 flex items-center justify-between">
            //             <p>
            //                 <span className="text-1xl font-bold text-slate-900"> ₹ {item.price}-{item.quantityType}</span>
            //             </p>
            //         </div>
            //         <a onClick={() => handleAddToCard(item.scrapId)} className="cursor-pointer flex items-center justify-center rounded-md bg-lime-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
            //             <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            //                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            //             </svg>
            //             Add to cart
            //         </a>
            //     </div>
            // </div>
        ));
    };

    return (
        <section id="Projects"
            class="w-fit mx-auto grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {renderData()}
        </section>

    );
};

export default PriceCardComponent;
