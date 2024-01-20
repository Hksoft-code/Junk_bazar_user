import React, { useEffect, useState } from "react";
import axiosInstance from "../../api-config/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "../../Common/Footer/Loader";
import PaginationComponent from "../PriceList/utils";

const OrdersRespEnum = {
  0: "Order In Process",
  1: "Orders Accepted",
  2: "Vendor On the Way",
  3: "Vendor Arrived",
  4: "Vendor Picked The Scrap",
  5: "Vendor rejected Your Order",
};

const TrackOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const placeholderImage =
    "https://play-lh.googleusercontent.com/93TI5hqzUF7_i61dah3PexL9DktIgsExTutymOXUkd7hdjlSx1P-3ZE0T-uZ2bnF5MXq";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/getUserOrder?page=${page - 1}&limit=10`
      );
      const scrapList = JSON.parse(response.data.data).orders;
      console.log("orderList", scrapList);

      if (page === 1) {
        setOrderList(scrapList);
      } else {
        setOrderList((prevOrderList) => [...prevOrderList, ...scrapList]);
      }

      // Update the total pages based on the totalScrapCount
      // const calculatedTotalPages = Math.ceil(scrapList.totalScrapCount / itemsPerPage);
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
        orderId,
      },
    });
  };

  return (
    <div className="w-full mt-32 flex justify-center items-center lg:max-w-[1100px] mx-auto">
      <div className="max-w-screen-xl w-full md:px-2 lg:px-4 px-0 ">
        {loading && <Loader />}
        {!loading && orderList.length === 0 && (
          <p className="flex justify-center items-center h-20">
            No data available.
          </p>
        )}
        {!loading &&
          orderList.map((order, index) => (
            <div class="mx-auto mt-8 max-w-2xl md:mt-12">
              <div class="bg-white shadow">
                <div class="px-4 py-6 sm:px-8 sm:py-10">
                  <div class="flow-root">
                    <ul class="-my-8">
                      <div class="flex flex-col items-start justify-start gap-5 mt-6 md:flex-row">
                        <p class="text-sm font-semibold text-slate-500">
                          {" "}
                          Order ID - {order?.orderId}
                        </p>

                        <div class="sm:order-1">
                          <span className="font-bold text-[10px] max-er:text-[12px] md:text-[9px] bg-[#81D742] mb-5 rounded-lg text-black p-2">
                            {OrdersRespEnum[order?.orderStatus]}
                          </span>
                        </div>
                      </div>

                      {order.items.map((scrapInfo, index) => (
                        <li
                          key={index}
                          class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div class="shrink-0">
                            <img
                              class="h-24  w-24 max-w-full rounded-lg object-cover"
                              src={
                                scrapInfo?.scrapInfo.docUrl
                                  ? scrapInfo?.scrapInfo.docUrl
                                  : placeholderImage
                              }
                              alt=""
                              onError={onImageError}
                            />
                          </div>

                          <div class="relative flex flex-1 flex-col justify-between">
                            <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div class="pr-8 sm:pr-5">
                                <p class="text-base font-semibold text-gray-900">
                                  {" "}
                                  {scrapInfo?.scrapInfo.scrapName}
                                </p>
                                <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  {order?.addressInfo.address}
                                </p>
                              </div>

                              <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                  ₹ {scrapInfo?.amount}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p class="mt-2 flex text-center justify-end  space-x-4">
                      Total - ₹ {order?.finalAmount}
                    </p>
                  </div>

                  <div class="mt-6 flex text-center justify-end  space-x-4 ">
                    <button
                      onClick={() => navigate("/pricing", { replace: true })}
                      className="bg-white lg:w-[200px] h-[50px] font-semibold bg-transparent border border-black rounded-[30px] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                    >
                      Browse More Scraps
                    </button>
                    <button
                      onClick={() => handleTrackOrder(order?.orderId)}
                      className="lg:w-[200px] rounded-[30px] h-[50px] font-semibold text-white bg-[#81D742] cursor-pointer max-sm:w-[100px] max-er:text-[10px] lg:text-[15px] max-md:w-[120px] max-er:w-[130px] p-3"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
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
  );
};

export default TrackOrderList;
