import React from "react";
import order_successful from "../assets/PNG/order_successful.png";
import { useNavigate } from "react-router-dom";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      
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

            {/* <button
              onClick={() => navigate("/", { replace: true })}
              class="flex-1 px-6 py-4 min-w-[250px] w-auto transition-all  shadow-xl sm:w-auto ml-2 bg-[#5AB344] text-white text-sm font-medium rounded-md"
            >
              Return To Home
            </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccessful;
