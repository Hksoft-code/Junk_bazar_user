import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from "react-redux";

const CartList = () => {
  const readCart = useSelector((state) => state.cart);
  console.log("this is readCart", readCart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full mt-32 flex justify-center items-center lg:max-w-[1100px] mx-auto">
      <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">
        {readCart?.map((cart) => (
          <div className="w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c] mt-[10px] mb-[10px] flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12">
            <div className="flex justify-center items-center mb-4 md:mb-0">
              <img
                className="w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] object-cover mr-[20px]  max-er:w-[120px] max-er:h-[120px] rounded-[10px]"
                src={cart?.image}
                alt=""
              />
              <div>
                <h3 className="font-bold text-[20px] max-er:text-[20px] md:text-[30px] text-gray-700">
                  {cart?.name}
                </h3>
                <div className="flex items-center">
                  <p className="text-green-600">
                    <CiLocationOn />
                  </p>
                  <p> {cart?.address}</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                Browse More Scraps
              </button>
              <button className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                Request Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;