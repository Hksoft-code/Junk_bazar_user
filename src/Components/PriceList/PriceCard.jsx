import {
    useEffect, useState 
} from "react";

import axiosInstance from "../../api-config/axiosInstance.js";
import {
    useNavigate 
} from "react-router-dom";
import Swal from "sweetalert2";

const PriceCardComponent = () => {
    const navigate = useNavigate();
    const [ scrapList,
        setScrapList ] = useState([]);
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

    async function fetchData(){
        try {
            const response = await axiosInstance.get("/getScrap");
            const {
                scraps 
            } = JSON.parse(response.data.data);

            setScrapList(scraps);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleAddToCard = async (scrapId) => {
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
            <div key={item.scrapId} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <img className="object-cover" src={item?.docUrl} alt="product image" />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div className="mt-4 px-5 pb-5">
                    <a onClick={() => navigate("/scrapDetails")}>
                        <h5 className="text-xl tracking-tight text-slate-900">{item.scrapName}</h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-3xl font-bold text-slate-900">{item.price} /-</span>
                        </p>
                    </div>
                    <a onClick={() => handleAddToCard(item.scrapId)} className="cursor-pointer flex items-center justify-center rounded-md bg-lime-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
            Add to cart
                    </a>
                </div>
            </div>
        ));
    };

    return (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">{renderData()}</div>
        </div>
    );
};

export default PriceCardComponent;
