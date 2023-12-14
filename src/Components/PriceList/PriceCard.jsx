import { useEffect, useState } from "react";
import { serverUrl } from "../../api-config/config";
import api from '../../api-config/axiosInstance';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PriceCardComponent = () => {
    const navigate = useNavigate();
    const [scrapList, setScrapList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get(`${serverUrl}/getScrap`);

            console.log("Get Scrap ", response)
            const scrapList = JSON.parse(response.data.data);
            console.log("Get Scrap List", scrapList)
            const list = scrapList
            console.log("list", list)
            setScrapList(list.scraps)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // const handleAddToCard = (event) => {
    //     console.log("added", event)

    // };

    const handleAddToCard = async (event) => {
        console.log("scrap Id", event)

        try {
            const AddScrapPayLoad = {
                scrapId: event
            }
            const response = await api.post(`${serverUrl}/addToCart`, AddScrapPayLoad);

            console.log("Added Scrap ", response)


            const resGet = response.data;
            if (resGet.statusCode === 200) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: "Add To Card Successfull"
                });

            }



        } catch (error) {
            console.error("Error fetching data:", error);

            if (error.response.status === 401) {
                const data = error.response;
                console.log("error more", data)
                // If server responded with a status code for a request  
                Swal.fire({
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 2500,
                    title: data.data.error
                });
                navigate("/sign-in");
            }
            else if (error.request) {
                // Client made a request but response is not received 
                console.log("<<<<<<<Response Not Received>>>>>>>>");
                console.log(error.request);

                if(error.request.status === 400){
                    Swal.fire({
                        icon: "error",
                        position: "center",
                        showConfirmButton: false,
                        timer: 2500,
                        title: "Scrap Already In Cart"
                    }); 
                }
            }
            else {
                // Other case 
                console.log("Error", error.message);
            }
        }
    }

    const renderData = () => {
        return scrapList?.map((item) => (
            <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">

                <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <img class="object-cover" src={item?.docUrl} alt="product image" />
                    <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
                <div class="mt-4 px-5 pb-5">
                    <a onClick={() => navigate("/scrapDetails")}>
                        <h5 class="text-xl tracking-tight text-slate-900"> {item.scrapName}</h5>
                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span class="text-3xl font-bold text-slate-900"> {item.price} /-</span>

                        </p>

                    </div>
                    <a  onClick={() => handleAddToCard(item.scrapId)} class="cursor-pointer flex items-center justify-center rounded-md bg-lime-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</a>
                </div>

            </div>

            // <div className="rounded overflow-hidden shadow-lg flex flex-col">

            //     <div className="relative">
            //         <img className="w-full"
            //             src={item?.docUrl}
            //             alt="" />
            //         <div
            //             className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
            //         </div>

            //     </div>
            //     <div className="px-6 py-4 mb-auto">


            //         <p className="text-gray-500 text-lg font-bold">
            //             {item.scrapName}
            //         </p>

            //         <div className="flex flex-row gap-10">
            //             {/* <p className="text-gray-500 text-sm">
            //                 {item.address}
            //             </p> */}
            //             <p className="text-gray-500 text-sm">
            //                 {item.price} /-
            //             </p>
            //         </div>
            //     </div>
            //     <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
            //         <span onClick={() => handleAddToCard(item.scrapId)} className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

            //             <span className="bg-lime-500 p-2 text-white rounded  border border-lime-800 ml-1">ADD TO CARD</span>

            //         </span>

            //         <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

            //             <span className="ml-1"></span>
            //         </span>
            //     </div>
            // </div>

        ));
    };

    return <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">{renderData()}</div>;
    </div>

};

export default PriceCardComponent;