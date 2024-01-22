import { useLocation, useNavigate } from "react-router-dom";
import { raisedPickup } from "../../../Services/pickupRequest";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Summary_component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState();
  const passData = location.state ? location.state.payload : null;
  console.log("Summary Data ", passData);

  const placeholderImage =
    "https://play-lh.googleusercontent.com/93TI5hqzUF7_i61dah3PexL9DktIgsExTutymOXUkd7hdjlSx1P-3ZE0T-uZ2bnF5MXq";
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    handleTotal();
    console.log("set Address");
  }, []);

  const handleTotal = () => {
    const scrapIdArray = [];
    const scraplist = passData.scraplist;
    let valueAdded = 0;

    for (let cartItem of scraplist.items) {
      scrapIdArray.push(cartItem.amount);
      valueAdded += cartItem.amount;
    }
    setTotalPrice(valueAdded);
    console.log("price list", scrapIdArray, " value" + valueAdded);
  };

  const handlePickup = async () => {
    try {
      const resp = await raisedPickup(
        passData.fullName,
        passData.scrapId,
        passData.stateCode,
        passData.countryCode,
        passData.pincode,
        passData.dialCode,
        passData.phoneNumber,
        passData.address,
        passData.city,
        passData.addToCartId,
        passData.addressId
      );

      if (resp.statusCode === 200) {
        navigate("/Success-page", {
          replace: true,
        });
      }
    } catch (error) {
      if (error?.response) {
        const data = error?.response?.data;
        if (data?.error?.statusCode === 400) {
          const mess = data.error;
          Swal.fire({
            icon: "error",
            position: "center",
            showConfirmButton: false,
            timer: 2500,
            title: mess._message,
          });
        }

        console.log("Status", error.response.status);
        console.log("Headers", error.response.headers);
      } else if (error.request) {
        // Client made a request but response is not received
        console.log("<<<<<<<Response Not Received>>>>>>>>");
        console.log(error.request);
      } else {
        // Other case
        console.log("Error", error.message);
      }
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-2xl md:mt-12 shadow-lg border-t-8 rounded-xl border-[#3CB043]">
      <div className="bg-white ">
        <div className="flex flex-col justify-between mt-5 ml-4 flex-grow">
          <span className="font-bold text-sm">{passData.fullName}</span>
          <span className="text-red-500 mt-2 text-sm">
            {passData.dialCode} {passData.phoneNumber}
          </span>
        </div>
        <span className="h-1 w-full bg-slate-400 lg:w-1/3"></span>
        <div className="flex flex-row  ml-4 flex-grow mt-2">
          <img
            src="https://file.rendit.io/n/C0CS7E4FGckCjnUrkzNJ.svg"
            alt="Carbonlocationfilled"
            id="CarbonlocationfilledRoot"
            className="w-5 h-4"
          />
          <span className="font-bold text-sm"> {passData.address}</span>
        </div>
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            <span className="h-1 w-full bg-slate-400 lg:w-1/3"></span>
            <ul className="-my-8">
              <span className="mt-10 font-bold text-slate-400 text-sm">
                Cart ID:- #{passData.addToCartId}
              </span>
              <div>
                <div className="flex mt-2  mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                    Total
                  </h3>
                </div>
                {passData?.scraplist.items.map((scrapDat, index) => (
                  <div
                    key={index}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex w-2/5">
                      <div className="w-10">
                        <img
                          className="h-10"
                          src={
                            scrapDat?.scrapInfo.docUrl
                              ? scrapDat?.scrapInfo.docUrl
                              : placeholderImage
                          }
                          alt=""
                          onError={onImageError}
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {scrapDat?.scrapInfo.scrapName}
                        </span>
                        <span className="text-red-500 text-sm">
                          {scrapDat?.scrapInfo.quantityType}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      {scrapDat?.quantity}
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ₹{scrapDat?.price}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      ₹{scrapDat?.amount}
                    </span>
                  </div>
                ))}
              </div>
            </ul>
          </div>
          <div className="mt-6 flex text-center justify-end  space-x-4 border-t border-b py-5">
            <p className="flex text-center absolute right-30  space-x-4">
              Total - ₹ {totalPrice}
            </p>
            <div className="my-6 flex space-x-4">
              <button
                onClick={handlePickup}
                className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary_component;
