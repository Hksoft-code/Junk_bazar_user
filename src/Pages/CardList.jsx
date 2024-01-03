import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import card from "../assets/PNG/cart.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/user/userSlice";
import { MdDeleteForever } from "react-icons/md";
import PaginationComponent from "../Components/PriceList/utils";

const CartList = () => {
  const readCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [scrapList, setScrapList] = useState([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [addToCard, setAddToCard] = useState();
  const [scrapPass, setScrapPass] = useState([]);
  const initialScrapState = {
    scraps: [],
    totalScrapCount: 0,
  };
  async function fetchData(page) {
    try {
      const response = await axiosInstance.get(`/getAddToCart?page=${page - 1}&limit=10`, {

      });

      const scrapAll = JSON.parse(response.data.data);
      console.log('orderList', scrapAll);

      setScrapList(scrapAll.cartLists);
      console.log("card list", scrapList)
      // Update the total pages based on the totalScrapCount
      // const calculatedTotalPages = Math.ceil(scrapList.totalScrapCount / itemsPerPage);
      setTotalPages("1");

      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const removeFromCard = async (scrapId) => {
    const payload = {
      scrapId: scrapId,
    };

    try {
      const response = await axiosInstance.post("/removeFormCart", payload);
      const data = response.data;


      if (data && data.statusCode === 409) {
        console.error("Scrap Not Found:", data.message);
      } else if (data && data.statusCode === 200) {
        dispatch(removeFromCart(scrapId));

        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: data.message,
        });
        fetchData(1)
        setScrapList((prevScrapList) =>
          prevScrapList.filter((scrap) => scrap.scrapId !== scrapId)
        );

        setTotalItems((prevCount) => prevCount - 1);
      } else {
        // Handle other cases or unexpected responses
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handlePickeupRequest = async (cart) => {

    console.log("card dat ", cart)
    const data = cart.items;


    for (var i = 0; i < data.length; i++) {
      const data = cart.item;
      const scrap = data[i];
      console.log("scrap id", scrap);
    }

    console.log("scrapList", scrapPass)
    // if (currentQuantity === 0) {
    //   setQuantity((prevQuantity) => ({
    //     ...prevQuantity,
    //     [cart.scrapInfo.scrapId]: 1,
    //   }));
    // }

    // console.log("card", cart);

    // const passData = {
    //   addToCartId: cart.addToCartId,
    //   quantity: cart.item[0].quantity,
    //   price: cart.scrapInfo.price,
    //   scrapId: cart.scrapInfo.scrapId,
    //   quantityType: cart.scrapInfo.quantityType,
    // };

    // console.log("passdata", passData);

    // navigate("/request_pickup", {
    //   state: {
    //     passData,
    //   },
    // });



  };

  const addQuantity = async (scrapId, quantity) => {
    const payload = {
      addScrapQuantity: quantity,
      scrapId: scrapId,
    };

    try {
      const response = await axiosInstance.post("/addScrapQuantity", payload);
      const data = response.data;

      if (data.statusCode === 200) {
        fetchData(); // Refresh the data after updating quantity
      }
    } catch (error) {
      console.error("Error updating scrap quantity:", error);
    }
  }


  const handleIncrement = (scrapId) => {

    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [scrapId]: (prevQuantity[scrapId] || 0) + 1,
    }));

    addQuantity(scrapId, quantity);
  };

  const handleDecrement = (scrapId) => {
    console.log("scrap decrease", scrapId)
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [scrapId]: Math.max((prevQuantity[scrapId] || 0) - 1, 0),
    }));
    addQuantity(scrapId, quantity);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      console.log("Changing page to:", pageNumber);
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // const currentItems = scrapList.slice(startIndex, endIndex);

  useEffect(() => {
    console.log("Effect triggered for page:", currentPage);
    console.log("Calling fetchData in useEffect");
    fetchData(currentPage);
    setQuantity(1)
  }, [currentPage]);

  return (
    <div className="w-full mt-5 flex justify-center items-center lg:max-w-[1100px] mx-auto ">
      <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 flex-col flex justify-center items-center">
        {scrapList?.items && scrapList?.items.length > 0 ? (
          <div class="mx-auto mt-8 max-w-2xl md:mt-12">
            <div class="bg-white shadow">
              <div class="px-4 py-6 sm:px-8 sm:py-10">
                <div class="flow-root">
                  <ul class="-my-8">
                    {scrapList?.items.map((cart, index) => (
                      <li key={index} class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div class="shrink-0">
                          <img class="h-24 w-24 max-w-full rounded-lg object-cover" src={cart?.scrapInfo.docUrl} alt="" />
                        </div>

                        <div class="relative flex flex-1 flex-col justify-between">
                          <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div class="pr-8 sm:pr-5">
                              <p class="text-base font-semibold text-gray-900"> {cart?.scrapInfo.scrapName}</p>
                              {/* <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">{order?.addressInfo.address}</p> */}
                            </div>

                            <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">₹ {cart?.scrapInfo.price}</p>

                              <div class="sm:order-1">
                                <div class="sm:order-1">
                                  <div className="flex items-start mt-2">
                                    <button onClick={() => handleDecrement(cart?.scrapId)} className="border bg-lime-500 text-white rounded-md py-2 px-4 mr-2">-</button>
                                    <span className="text-4xl font-bold mx-4">{quantity[cart?.scrapId]}</span>
                                    <button onClick={() => handleIncrement(cart?.scrapId)} className="border bg-lime-500 text-white rounded-md py-2 px-4 ml-2">+</button>
                                  </div>
                                </div>
                              </div>

                              <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button onClick={(e) => removeFromCard(cart.scrapId)} type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>


                        </div>
                      </li>
                    ))}


                  </ul>
                </div>



                <div class="mt-6 flex text-center justify-end  space-x-4 border-t border-b py-5">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate("/pricing", { replace: true })}
                      className="lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                    >
                      Browse More Scraps
                    </button>
                    <button
                      onClick={() => handlePickeupRequest(scrapList)}
                      className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                    >
                      Request Pickup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ) : (
          <div className="container mx-auto max-w-sm w-full  sm:w-1/2">
            <div className="card flex flex-col justify-center p-10 rounded-lg ">
              <div className="prod-img">
                <img
                  src={card}
                  className="w-full object-cover object-center"
                  alt=""
                />
              </div>
              <div className="prod-info grid gap-10">
                <div>
                  <p>You don’t have any scrap in your cart</p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-gray-900">
                  <button
                    onClick={() => navigate("/pricing", { replace: true })}
                    className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full   border-2 border-lime-500 focus:outline-none"
                  >
                    Browse Scraps
                  </button>
                  <button
                    onClick={() => navigate("/pricing", { replace: true })}
                    className="px-2 py-2 transition ease-in duration-200 uppercase rounded-full bg-lime-500  border-2 border-lime-500 focus:outline-none"
                  >
                    Return To Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="flex items-center  justify-center   ">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CartList;
