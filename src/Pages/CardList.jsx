import React, { useEffect, useState } from "react";
import axiosInstance from "../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import card from "../assets/PNG/cart.png";
import Swal from "sweetalert2";
import DeleteIcon from "../../src/assets/ICONS/DeleteIcons";

const CartList = () => {
  const [scrapList, setScrapList] = useState([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showDeleteItems, setShowDeleteItems] = useState([]);
  const [width, setWidth] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const placeholderImage =
    "https://play-lh.googleusercontent.com/93TI5hqzUF7_i61dah3PexL9DktIgsExTutymOXUkd7hdjlSx1P-3ZE0T-uZ2bnF5MXq";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };  
  useEffect(() => {
    fetchData();
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function fetchData() {
    try {
      const response = await axiosInstance.get(
        `/getAddToCart`
      );

      const scrapAll = JSON.parse(response.data.data);
      setScrapList(scrapAll.cartLists);

      if (localStorage.getItem("totalScrapCount")) {
        localStorage.removeItem("totalScrapCount");
        localStorage.setItem("totalScrapCount", scrapAll.totalScrapCount);
      }
      let amount = 0;
      if (response.data.data) {
        console.log("if........");
        JSON.parse(response.data.data)?.cartLists?.items?.map((data) => {
          console.log("data from if......", data);
          if (data.amount) {
            amount = amount + data.amount;
          }
          setTotalPrice(amount);
        });
      } else {
        console.log("heloo else....");
      }
      navigate(`/cart?items=${scrapAll?.totalScrapCount}`);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  console.log("totalPrice from state is", totalPrice);

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
        await fetchData();
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: data.message,
        });
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handlePickeupRequest = async (cart) => {
    const cartItems = cart.items;

    const scrapIdArray = [];
    for (let cartItem of cartItems) {
      scrapIdArray.push(cartItem.scrapId);
    }

    const passData = {
      addToCartId: cart.addToCartId,
      scrapList: scrapList,
      scrapId: scrapIdArray.join(", "),
    };
    navigate("/checkoutAddress", {
      state: {
        passData,
      },
    });
  };

  const triggerAddQuantity = async (scrapId, quantity) => {
    const payload = {
      addScrapQuantity: quantity,
      scrapId: scrapId,
    };

    try {
      const response = await axiosInstance.post("/addScrapQuantity", payload);
      const data = response.data;

      if (data.statusCode === 200) {
        fetchData(); // Refresh the data after updating quantity
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: false,
          timer: 1500,
          title: "Quantity updated Successfully",
        });
      }
    } catch (error) {
      console.error("Error updating scrap quantity:", error);
    }
  };

  const handleIncrement = (scrapId, quantityNumber) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [scrapId]: (prevQuantity[scrapId] || 0) + 1,
    }));
    if (quantityNumber == 1) {
      const isPresent = showDeleteItems.some((items) => {
        return items.id == scrapId;
      });
      if (isPresent) {
        const result = showDeleteItems?.filter((items) => {
          return items.id != scrapId;
        });
        setShowDeleteItems(result);
      }
    }

    triggerAddQuantity(scrapId, quantityNumber + 1);
  };

  const handleDecrement = (scrapId, quantityNumber) => {
    console.log("scrap decrease", scrapId);
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [scrapId]: Math.max((prevQuantity[scrapId] || 0) - 1, 0),
    }));
    if (quantityNumber === 1) {
      const isPresent = showDeleteItems.some((items) => {
        return items.id === scrapId;
      });
      if (!isPresent) {
        setShowDeleteItems([...showDeleteItems, { id: scrapId, status: true }]);
      }
    }
    triggerAddQuantity(scrapId, quantityNumber - 1);
  };

  return (
    <div className="w-full mt-5 flex justify-center items-center mx-auto">
      <div className="w-full px-0 flex-col flex justify-center items-center ">
        {scrapList?.items && scrapList?.items.length > 0 ? (
          <div class="mx-auto mt-8 md:mt-12 w-full ">
            <div class="bg-white w-full">
              <div class="px-2 sm:px-1 py-10 sm:py-10">
                <div class="">
                  <ul class="-my-8">
                    {scrapList?.items.map((cart, index) => (
                      <li
                        key={index}
                        class="flex items-center gap-4 sm:gap-4 space-y-3 py-3 sm:py-3  px-1 sm:px-6 text-left flex-row border-b-[1px] "
                      >
                        <div class="shrink-0 flex justify-center items-center pb-3">
                          <img
                            class="h-28 w-28 sm:h-36 sm:w-32 max-w-full rounded-lg object-cover"
                            src={
                              cart?.scrapInfo.docUrl
                                ? cart?.scrapInfo.docUrl
                                : placeholderImage
                            }
                            alt=""
                            onError={onImageError}
                          />
                        </div>

                        <div class="relative flex flex-1 flex-col justify-between h-full">
                          <div class="flex flex-row items-center justify-start h-full">
                            <div class="flex flex-col w-fit h-full ">
                              <div className="flex flex-col gap-1 justify-center w-[150px] h-full">
                                <p class="text-[17px] sm:text-[19px] font-normal text-gray-900 w-fit">
                                  {" "}
                                  {cart?.scrapInfo.scrapName}
                                </p>
                              </div>
                              <div
                                className={`bg-red-300 justify-center items-center flex sm:hidden  cursor-pointer px-7 py-5 min-xl:py-5 min-xl:px-10 w-fit ${
                                  cart.quantity < 2 && width < 640
                                    ? "block"
                                    : "hidden"
                                }`}
                                onClick={(e) => removeFromCard(cart.scrapId)}
                              >
                                {<DeleteIcon />}
                              </div>
                            </div>

                            <div class="mt-0 flex items-end justify-end sm:mt-0 sm:items-start sm:justify-end h-full ">
                              <div class="flex flex-col sm:flex-row items-center gap-4 lg:gap-20 h-full ">
                                <div class="flex flex-col gap-8 h-full  justify-end w-[150px] lg:w-[200px] min-large:w-[300px] ">
                                  <div className="flex justify-end sm:ml-4 ">
                                    <button
                                      onClick={() =>
                                        handleDecrement(
                                          cart?.scrapId,
                                          cart.quantity
                                        )
                                      }
                                      className="border bg-gray-300 text-white rounded-md  py-[4px] sm:py-[5px] px-3 min-xl:px-5 sm:px-5 mr-2 font-semibold"
                                    >
                                      -
                                    </button>
                                    <span className="text-[20px] font-semibold mx-[4px] sm:mx-[8px] mt-[2px]">
                                      {cart.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleIncrement(
                                          cart?.scrapId,
                                          cart.quantity
                                        )
                                      }
                                      className="border bg-[#3CB043] text-white rounded-md py-[4px] sm:py-[5px] px-3 min-xl:px-5 sm:px-5 font-semibold ml-2"
                                    >
                                      +
                                    </button>
                                  </div>
                                  {/* <div>
                                    <button className="w-[150px] sm:w-[180px] h-[40px] rounded-full font-semibold text-white bg-[#3CB043] cursor-pointer  text-[13px] md:text-[15px]">
                                      Checkout
                                    </button>
                                  </div> */}
                                </div>
                                <div>
                                  <p class="text-base font-semibold text-gray-900 flex flex-row gap-3 w-[100px] lg:w-[100px] min-large:w-[100px]">
                                    ₹{cart?.scrapInfo.price}-
                                    {cart?.scrapInfo.quantityType}
                                  </p>
                                </div>
                                <div className="flex flex-col min-small:flex-row gap-20 items-center">
                                  <div
                                    className={`hidden  justify-end items-center sm:block cursor-pointer w-[100px]  ${
                                      cart.quantity < 2 ? "block" : "hidden"
                                    }`}
                                    onClick={(e) =>
                                      removeFromCard(cart.scrapId)
                                    }
                                  >
                                    <span className="flex justify-end items-center">
                                      {<DeleteIcon />}
                                    </span>
                                  </div>
                                  <div className=" order-first min-small:order-first h-full  text-black font-semibold w-[150px]">
                                    Amount: {cart?.amount}
                                  </div>
                                </div>
                               
                              </div>

                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div class="mt-6 flex flex-col items-end justify-end space-x-4 py-5">
                  <div className="font-bold">
                    <span>Gross Amount :{totalPrice}</span>
                  </div>
                  <div className="flex space-x-4 justify-end mt-3">
                    <button
                      onClick={() => navigate("/pricing", { replace: true })}
                      className="lg:w-[200px] h-[40px] sm:h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] text-[13px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                    >
                      Browse More Scraps
                    </button>
                    <button
                      onClick={() => handlePickeupRequest(scrapList)}
                      className="lg:w-[200px] rounded-[30px] h-[40px] sm:h-[50px] font-semibold text-white bg-[#3CB043] cursor-pointer max-sm:w-[100px] max-er:text-[10px] text-[13px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
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
      </div>
    </div>
  );
};

export default CartList;
