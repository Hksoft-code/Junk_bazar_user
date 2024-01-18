import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import step1 from "../../assets/PNG/accept.png";
import step2 from "../../assets/PNG/onway.png";
import step3 from "../../assets/PNG/arrive.png";
import step4 from "../../assets/PNG/deliver.png";
import step1_done from "../../assets/PNG/accept_grren.png";
import step2_done from "../../assets/PNG/onway_green.png";
import step3_done from "../../assets/PNG/arrive_green.png";
import step4_done from "../../assets/PNG/deliver_greenn.png";
import tick_green from "../../assets/PNG/tick_green.png";
import tick_grey from "../../assets/PNG/tick_grey.png";
import Button from "../auth/Button";
import Nav from "../../Common/Navbar/Nav";
import Footer from "../../Common/Footer/Footer";
import { useEffect } from "react";
import axiosInstance from "../../api-config/axiosInstance";
import { Rating } from "react-simple-star-rating";
import StarRatingComponent from "react-star-rating-component";
import Swal from "sweetalert2";

const TrackOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [backendOrderStatus, setOrderStatus] = useState("");
  const [rating, setRating] = useState(1);
  console.log("phoneNumberObj", location.state.orderId);
  const [orderDetail, setOrderDetail] = useState("");

  const [review, setReview] = useState();

  const handleRating = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getUserOrderInfo", {
        params: {
          orderId: location.state.orderId,
        },
      });
      const OrderTrack = JSON.parse(response.data.data);
      console.log("order Track Status", OrderTrack);
      setOrderStatus(OrderTrack.orderStatus);
      setOrderDetail(OrderTrack);
      // Initialize quantity state with default value
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleReview = async () => {
    const payload = {
      orderId: orderDetail.orderId,
      rating: rating,
      comment: review,
    };

    try {
      const resp = await axiosInstance.post("/addReview", payload);
      const dataObject = resp.data;

      if (dataObject.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: "Thanks for your feedback",
        });
        navigate("/pricing");
      }
    } catch (error) {
      console.error("error", error);

      if (error.response) {
        Swal.fire({
          icon: "error",
          position: "center",
          showConfirmButton: false,
          timer: 2500,
          title: error.response.data.error._message,
        });
      } else if (error.request) {
        // Client made a request but response is not received
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      } else {
        // Other case
        console.log("Error", error.message);
      }
      // Error handling here
    }
  };
  const OrdersEnum = {
    ACCEPTED: 1,
    ARRVIED: 3,
    ON_THE_WAY: 2,
    PENDING: 0,
    REJECTED: 5,
    SCRAP_PICKED: 4,
  };
  return (
    <div>
      <Nav />
      <div className=" mt-20 lg:mt-32  justify-center items-center lg:max-w-[1250px] mx-auto ">
        <h2 className="mt-5 text-3xl text-center font-extrabold">
          Pickup Status
        </h2>

        <div className="pt-[10px] p-10 pb-12 flex flex-col justify-center items-center ">
          <div className="w-full p-2 mt-12 flex justify-center items-center lg:max-w-[1100px] mx-auto">
            <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">
              {orderDetail.vendorInfo && (
                <>
                  <div>
                    <div
                      className="shadow border-t-4 rounded-xl border-[#3CB043]  text-green-700 px-4 py-3"
                      role="alert"
                    >
                      <p class="font-bold">
                        {" "}
                        Name: {orderDetail.vendorInfo?.firstName}{" "}
                        {orderDetail.vendorInfo?.lastName}
                      </p>
                      <p class="text-sm">
                        Phone Number: {orderDetail.vendorInfo?.dialCode}{" "}
                        {orderDetail.vendorInfo?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className="mb-10 p-[2.5rem] w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center  py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <img
                    className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.ACCEPTED
                        ? step1_done
                        : step1
                    }
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                      Order Accepted
                    </h3>
                    <div className="flex items-center">
                      <p>Our Agent has accepted your Order</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img
                    className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.ACCEPTED
                        ? tick_green
                        : tick_grey
                    }
                    alt=""
                  />
                </div>
              </div>

              <div className="mb-10 w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <img
                    className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.ON_THE_WAY
                        ? step2_done
                        : step2
                    }
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                      Agent on the way
                    </h3>
                    <div className="flex items-center">
                      <p>Our agent is on their way to your location</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img
                    className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.ON_THE_WAY
                        ? tick_green
                        : tick_grey
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="mb-10 w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <img
                    className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.ARRVIED
                        ? step3_done
                        : step3
                    }
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                      Agent Arrived
                    </h3>
                    <div className="flex items-center">
                      <p>Our agent has gotten to your Location</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img
                    className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.ARRVIED
                        ? tick_green
                        : tick_grey
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="mb-10 w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px]  flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
                <div className="flex justify-center items-center mb-4 md:mb-0">
                  <img
                    className="w-[50px] h-[50px] max-sm:w-[20px] max-sm:h-[20px] object-cover mr-[20px]  max-er:w-[50px] max-er:h-[50px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.SCRAP_PICKED
                        ? step4_done
                        : step4
                    }
                    alt=""
                  />
                  <div>
                    <h3 className="font-bold text-[10px] max-er:text-[20px] md:text-[20px] text-gray-700">
                      Agent Picked up Order
                    </h3>
                    <div className="flex items-center">
                      <p>Agent successfully picked all scraps</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img
                    className="w-[30px] h-[30px] max-sm:w-[20px] max-sm:h-[10px] object-cover mr-[20px]  max-er:w-[30px] max-er:h-[30px] rounded-[10px]"
                    src={
                      backendOrderStatus >= OrdersEnum.SCRAP_PICKED
                        ? tick_green
                        : tick_grey
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
            <button
              onClick={() => navigate("/pricing", { replace: true })}
              class="flex-1 px-6 py-4 min-w-[250px] font-[400] text-[28px] w-auto transition-all  shadow-xl sm:w-auto  border border-black outline-none bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm  rounded-[50.94px]"
            >
              Browse More Scraps
            </button>

            <button
              onClick={() => navigate("/", { replace: true })}
              class="flex-1 px-6 py-4 min-w-[250px] font-[400] text-[28px] w-auto transition-all  shadow-xl sm:w-auto ml-2 bg-[#5AB344] text-white text-sm  rounded-[50.94px]"
            >
              Return To Home
            </button>
          </div>
          {/* <div className="mt-10 flex flex-col md:flex-row mx-auto">
            <Button
              handleClick={() => navigate("/pricing", { replace: true })}
              label="Browse More Scraps"
              classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] text-[#343434] border border-black outline-none bg-white m-2"
            />
            <Button
              handleClick={() => navigate("/", { replace: true })}
              label="Return To Home"
              classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] bg-[#5AB344] text-white m-2"
            />
          </div> */}
        </div>

        {!orderDetail.comment ? (
          <div class="py-3 justify-center sm:max-w-xl sm:mx-auto">
            <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
              <div class="px-12 py-5 text-center justify-center">
                <h2 class="text-gray-800 text-3xl font-semibold">
                  Your opinion matters to us!
                </h2>
              </div>
              <div class="bg-gray-200 w-full flex flex-col items-center">
                <div class="flex flex-col items-center py-6 space-y-3">
                  {/* <span class="text-lg text-gray-800">
         How was quality of the call?
       </span> */}
                  <StarRatingComponent
                    className="w-20"
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={handleRating}
                  />
                </div>
                <div class="w-3/4 flex flex-col">
                  <textarea
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                    rows="3"
                    class="p-4 text-gray-500 rounded-xl resize-none"
                    placeholder="Leave a message, if you want"
                  ></textarea>
                  <button
                    onClick={handleReview}
                    class="py-3 my-8 text-lg bg-[#5AB344] rounded-xl text-white"
                  >
                    Rate now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="py-3 justify-center sm:max-w-xl sm:mx-auto">
            <div class="bg-white max-w-2xl flex flex-col border-l-8 border-[#3CB043] rounded-xl shadow-lg">
              <div class="px-12 py-5 text-center justify-center">
                <h2 class="text-gray-800 text-3xl font-semibold">
                  You Have Already Given Your Feedback!
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrderDetails;
