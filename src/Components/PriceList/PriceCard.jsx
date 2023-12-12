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

            console.log("Added Scrap ", response.data.data)


            const resGet = response.data.data;
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
        }
    }

    const renderData = () => {
        return scrapList?.map((item) => (

            <div class="rounded overflow-hidden shadow-lg flex flex-col">

                <div class="relative">
                    <img class="w-full"
                        src={item?.docUrl}
                        alt="" />
                    <div
                        class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>

                </div>
                <div class="px-6 py-4 mb-auto">


                    <p class="text-gray-500 text-lg font-bold">
                        {item.scrapName}
                    </p>

                    <div className="flex flex-row gap-10">
                        {/* <p class="text-gray-500 text-sm">
                            {item.address}
                        </p> */}
                        <p class="text-gray-500 text-sm">
                            {item.price} /-
                        </p>
                    </div>
                </div>
                <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span onClick={() => handleAddToCard(item.scrapId)} class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

                        <span class="bg-lime-500 p-2 text-white rounded  border border-lime-800 ml-1">ADD TO CARD</span>

                    </span>

                    <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

                        <span class="ml-1"></span>
                    </span>
                </div>
            </div>

        ));
    };

    return <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">{renderData()}</div>;
    </div>

};

export default PriceCardComponent;