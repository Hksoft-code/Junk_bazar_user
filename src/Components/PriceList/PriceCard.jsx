import { useEffect, useState } from "react";

import axiosInstance from "../../api-config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart, removeFromCart } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "./utils.jsx";
import Loader from "../../Common/Footer/Loader.jsx";

const PriceCardComponent = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // You can adjust this based on your design
  const [loading, setLoading] = useState(true);
  const [scrapList, setScrapList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const handleApiError = (error) => {
    if (error.response) {
      const { status, data } = error.response;

      console.log("Error response:", data);

      if (status === 401) {
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: data.error,
        });
        navigate("/sign-in");
      } else if (status === 400) {
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: "Scrap Already In Cart",
        });
      }
    } else if (error.request)
      console.error("Response not received:", error.request);
    else console.error("Other error:", error.message);
  };

  async function fetchData(page) {
    try {
        const response = await axiosInstance.get("/getScrap", {
            params: {
                page: page,  
                limit: 10, 
            },
        });

        const { scraps, totalScrapCount } = JSON.parse(response.data.data);
        setTotalItems(totalScrapCount);
        setScrapList(scraps);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
    }
}

  
  
  

  const handleAddToCard = async (scrapId) => {
    dispatch(addToCart(scrapId));
    try {
      const AddScrapPayLoad = {
        scrapId,
      };
      const response = await axiosInstance.post("/addToCart", AddScrapPayLoad);
      const { statusCode } = response.data;

      if (statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: "Add To Cart Successful",
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };
  
const totalPages = Math.ceil(totalItems / itemsPerPage);
  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = scrapList.slice(startIndex, endIndex);
    return currentItems?.map((item) => (
      <div
        key={item.scrapId}
        className="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
      >
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <img className="object-cover" src={item?.docUrl} alt="product" />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </div>
        <div className="mt-4 px-5 pb-5">
          <div className="opacity-80 text-2xl font-['Gilroy-SemiBold'] text-[#4a4a4a] ">
            {item.scrapName}
          </div>
          {/* <h5 className="text-lg  tracking-tight text-slate-900">{item.scrapName}</h5> */}

          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-1xl font-bold text-slate-900">
                {" "}
                ₹ {item.price}-{item.quantityType}
              </span>
            </p>
          </div>
          <div
            onClick={() => handleAddToCard(item.scrapId)}
            className="cursor-pointer flex items-center justify-center rounded-md bg-lime-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add to cart
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-5 md:p-5 flex flex-col items-center justify-center ">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10 md:gap-10">
            {renderData()}
          </div>
        )}
        <div className="mt-4">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default PriceCardComponent;
