import React from "react";
import order_successful from "../assets/PNG/order_successful.png";
import Button from "../Components/auth/Button";
import { useNavigate } from "react-router-dom";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      {/* <div className="pt-[80px] pb-12 flex flex-col justify-center items-center top-[325px]">
        <img
          src={order_successful}
          className="order_img w-[750px] h-[490px]"
          alt=""
        />
        <div>
          <p className="order_text_1 font-[400] text-[40px] text-[#4A4A4A] underline text-center">
            Order sent successfully{" "}
          </p>
          <p className="order_text_2 text-[22px] text-[#4A4A4A] font-[400] text-center">
            Our agents are on their way <br /> to pick up.
          </p>
        </div>
        <div className="mt-10 flex">
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
        </div>
      </div> */}

      <div class="w-full mt-20 md:w-1/3 mx-auto">
        <div class="flex flex-col p-5 ">
          <div class="flex flex-col items-center text-center">
            <div class="inline-block ">
              <img
                src={order_successful}
                className="order_img w-full "
                alt=""
              />
            </div>
            <h2 class="mt-2 font-semibold text-gray-800">
              Order sent successfully{" "}
            </h2>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
              Our agents are on their way <br /> to pick up.
            </p>
          </div>

          <div class="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
            <button
              onClick={() => navigate("/pricing", { replace: true })}
              class="flex-1 px-6 py-4 min-w-[250px] w-auto transition-all  shadow-xl sm:w-auto  border border-black outline-none bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              Browse More Scraps
            </button>

            <button
              onClick={() => navigate("/", { replace: true })}
              class="flex-1 px-6 py-4 min-w-[250px] w-auto transition-all  shadow-xl sm:w-auto ml-2 bg-[#5AB344] text-white text-sm font-medium rounded-md"
            >
              Return To Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccessful;
