import React, { useEffect, useState } from "react";
import axiosInstance from "../../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "../../Common/Footer/Loader";
import PaginationComponent from "../PriceList/utils";

const OrdersRespEnum = {
  0: "Order In Pending",
  1: "Orders Accepted",
  2: "Vendor On the Way",
  3: "Vendor Arrived",
  4: "Vendor Picked The Scrap",
  5: "Vendor rejected Your Order"
};

const TrackOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const OrdersPerPage = 4; // Number of orders to display per page

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axiosInstance.get(`/getUserOrder?page=0&limit=10`);
      const scrapList = JSON.parse(response.data.data);
      console.log('orderList', scrapList);

      const scrapAll = scrapList.orders;

      console.log("scrapAll", scrapAll);
      if (page === 0) {
        setOrderList([scrapAll[0]]);
      } else {
        setOrderList((prevOrderList) => [...prevOrderList, ...scrapAll]);
      }

      console.log("order track", orderList)
      const calculatedTotalPages = Math.ceil(scrapList.totalScrapCount / OrdersPerPage);
      setTotalPages(calculatedTotalPages);
      setTotalPages("1");

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };




  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };


  const handleTrackOrder = (orderId) => {
    console.log("tracking order id", orderId);
    navigate("/trackOrderDetails", {
      state: {
        orderId
      }
    });
  };

  return (
    <div className="w-full mt-32 flex justify-center items-center lg:max-w-[1100px] mx-auto">

      <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">
        {loading && <Loader />}


        {!loading && orderList.length === 0 && <p className=" flex justify-center items-center ">No data available.</p>}
        {!loading &&
          orderList.items?.map((cart, index) => (
            <div key={index} className="w-full max-sm:h-[250px] h-[300px] md:h-auto bg-[#80d7421c]  mt-[10px] mb-[10px] flex flex-col md:flex-row justify-between items-center p-[2.5rem] py-[2.7rem] md:p-8 lg:p-12 rounded-lg">
              <div className="flex justify-center items-center mb-4 md:mb-0">
                <img
                  className="w-[150px] h-[150px] max-sm:w-[100px] max-sm:h-[100px] object-cover mr-[20px]  max-er:w-[120px] max-er:h-[120px] rounded-[10px]"
                  src={cart?.scrapInfo.docUrl}
                  alt=""
                />

                <div>
                  <span className="font-bold text-[10px] max-er:text-[12px] md:text-[10px] bg-[#81D742] mb-5 rounded-lg text-black p-2">
                    {OrdersRespEnum[cart.orderStatus]}
                  </span>
                  <h3 className="font-bold text-[20px] max-er:text-[20px] md:text-[30px] text-black">
                    {cart?.scrapInfo.scrapName}
                  </h3>
                  <div className="grid  items-center text-black">

                    <p>{cart?.address}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => navigate("/pricing", { replace: true })} className="bg-white lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                  Browse More Scraps
                </button>
                <button onClick={() => handleTrackOrder(cart.orderId)} className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3">
                  Track Order
                </button>
              </div>
            </div>
          ))}

        {loading && orderList.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}

export default TrackOrderList;