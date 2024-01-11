import { useEffect, useState } from "react";

import axiosInstance from "../../api-config/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart, removeFromCart } from "../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "./utils.jsx";
import Loader from "../../Common/Footer/Loader.jsx";
import CartIcon from "../../assets/ICONS/CartIcons.jsx"

const PriceCardComponent = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [loading, setLoading] = useState(true);
  const [scrapList, setScrapList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
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
      setLoading(true);

      const response = await axiosInstance.get("/getScrap", {
        params: {
          page: page - 1,
          limit: itemsPerPage,
        },
      });

      console.log("Fetching data for page:", page);

      const responseData = JSON.parse(response.data.data);
      const { scraps, totalScrapCount } = responseData;

      console.log(scraps, totalScrapCount, "getdatas");

      setTotalItems(totalScrapCount);

      setScrapList((prevScrapList) => {
        if (page === 1) {
          return scraps;
        }

        return [...prevScrapList, ...scraps];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCard = async (scrapId) => {
    try {
      const AddScrapPayLoad = {
        scrapId,
      };

      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        platform: "web",
      };

      const response = await axiosInstance.post("/addToCart", AddScrapPayLoad, {
        headers,
      });

      const { statusCode } = response.data;

      if (statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          title: "Add To Cart Successful",
        });
        dispatch(addToCart(scrapId));
        fetchDataForCartList(0);
      }
    } catch (error) {
      handleApiError(error);
    }
  };
  console.log("setCartItems", cartItems);

  const fetchDataForCartList = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/getAddToCart?page=${1 - 1}&limit=10`
      );
      const scrapAll = JSON.parse(response.data.data);
      setCartItems(scrapAll?.cartLists?.items);
      console.log("scrapAll", scrapAll?.cartLists?.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
    fetchDataForCartList(0);
  }, []);
  console.log("cartItems", cartItems);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);

    console.log("Page changed to:", pageNumber);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [quantities, setQuantities] = useState({});
  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = scrapList ? scrapList.slice(startIndex, endIndex) : [];
    // Handle quantity change for a specific product
    const handleQuantityChange = (productId, quantity) => {
      setQuantities({ ...quantities, [productId]: quantity });
    };
    console.log("quantities", quantities);

    const isItemInCart = (productId) => {
      console.log("cartItems in ", cartItems, productId);
      return cartItems?.some((item) => item.scrapId === productId);
    };

    return currentItems?.map((item) => (
      <div
        key={item.scrapId}
        className="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white cardshadow"
      >
        <div className="relative mx-2 sm:mx-3 mt-2 sm:mt-3 flex h-36 sm:h-60 overflow-hidden rounded-xl">
          <img className="object-cover" src={item?.docUrl} alt="product" />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </div>
        <div className="mt-1 sm:mt-4 px-5 pb-3 sm:pb-5">
          <div className="opacity-80 text-[20px] min-xxl:text-[25px] font-['Gilroy-SemiBold'] text-[#4a4a4a] ">
            {item.scrapName}
          </div>
          {/* <h5 className="text-lg  tracking-tight text-slate-900">{item.scrapName}</h5> */}

          <div className="sm:mt-2 mb-2 sm:mb-5 flex items-center justify-between">
            <p>
              <span className="text-[14px] min-xxl:text-[17px] font-bold text-slate-900 truncate">
                {" "}
                ₹ {item?.price}-{item?.quantityType}
              </span>
            </p>
          </div>
          <div className="flex flex-col min-md:flex-row items-start min-md:items-center gap-2">
            <div
              onClick={() => handleAddToCard(item?.scrapId)}
              className="w-full cursor-pointer flex items-center justify-center rounded-full bg-[#3CB043] px-2 sm:px-2 md:px-3 lg:px-5 h-8 min-xl:h-9 text-center text-sm min-md:text-[11px] min-xl:text-sm font-medium text-white hover:bg-[#5AB344] focus:outline-none focus:ring-4 focus:ring-blue-300 truncate"
            >
              {isItemInCart(item?.scrapId.toString()) ? (
               <div className="flex gap-1 items-center">
                 <div className="hidden lg:block">
                  {<CartIcon/>}
                 </div>
                <p>Added to cart</p>
               </div>
              ) : (
                "Add to Cart"
              )}
            </div>
            <div className="flex items-center flex-nowrap">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                className="border-2 border-[#3CB043] rounded-md w-[40px] outline-none pl-1"
                value={quantities[item?.scrapId] || 1}
                onChange={(e) =>
                  handleQuantityChange(item?.scrapId, parseInt(e.target.value))
                }
              />
              <span className="font-normal min-xxl:font-medium text-[11px] min-xxl:text-[14px] ml-1">
                QTY
              </span>
            </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 md:gap-10">
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
