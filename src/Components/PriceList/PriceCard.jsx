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
            }
            else {
                // Other case 
                console.log("Error", error.message);
            }
        }
    }

    const renderData = () => {
        return scrapList?.map((item) => (

            <div className="rounded overflow-hidden shadow-lg flex flex-col">

                <div className="relative">
                    <img className="w-full"
                        src={item?.docUrl}
                        alt="" />
                    <div
                        className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                    </div>

                </div>
                <div className="px-6 py-4 mb-auto">


                    <p className="text-gray-500 text-lg font-bold">
                        {item.scrapName}
                    </p>

                    <div className="flex flex-row gap-10">
                        {/* <p className="text-gray-500 text-sm">
                            {item.address}
                        </p> */}
                        <p className="text-gray-500 text-sm">
                            {item.price} /-
                        </p>
                    </div>
                </div>
                <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span onClick={() => handleAddToCard(item.scrapId)} className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

                        <span className="bg-lime-500 p-2 text-white rounded  border border-lime-800 ml-1">ADD TO CARD</span>

                    </span>

                    <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">

                        <span className="ml-1"></span>
                    </span>
                </div>
            </div>

        ));
    };

    return <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">{renderData()}</div>;
    </div>

};

export default PriceCardComponent;