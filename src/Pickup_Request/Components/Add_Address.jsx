import { useEffect, useState } from "react";
import addressDot from "../../assets/PNG/addressDot.png";
import Add_Address_form from "./Add_Address_Form";
import Confirm from "./PopUp/popup";
import "../styles/pickupRequest.css";
import { getAllAddress } from "../../Services/pickupRequest";
import showErrorMessage from "../../utils/ErrorAlert";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Edit_Address_form from "./Edit_Address_form";

const Add_Address = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [addres, setAddress] = useState();
  const [checked, setChecked] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");
  const [defaultAddress, setDefault] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const location = useLocation();
  const passData = location.state ? location.state.passData : null;

  function onChange(i) {
    setSelected((prev) => (i === prev ? null : i));
    setSelectAddress(addres[selected]);
    console.log("selected Adddress ", selectAddress);
  }

  const handlePickup = () => {
    const payLoad = {
      addToCartId: passData.addToCartId,
      scrapId: passData.scrapId,
      stateCode: selectAddress.stateCode,
      countryCode: selectAddress.countryCode,
      pincode: selectAddress.pincode,
      address: selectAddress.address,
      city: selectAddress.city,
    };

    navigate("/request_pickup", {
      state: {
        payLoad,
      },
    });
  };

  useEffect(() => {
    getAddress();
    console.log("set Address");
  }, []);

  const getAddress = async () => {
    try {
      const allAddress = await getAllAddress();
      console.log("user login from Service File", allAddress);
      setAddress(allAddress.address);
      setSelectAddress(allAddress.address[0]);
    } catch (error) {
      console.error("error", error);
      // const errorMessage = !error.response?.data.error.message
      //   ? error.response.data.error?._message
      //   : error.response.data.error.message;
      // showErrorMessage(errorMessage, "error");
    }
  };

  const handleSkip = () => {
    const payLoad = {
      addToCartId: passData.addToCartId,
      scrapId: passData.scrapId,
    };

    navigate("/request_pickup", {
      state: {
        payLoad,
      },
    });
  };

  return (
    <>
      <div className="">
        <div class="max-w-2xl mx-auto mt-24">
          <div
            onClick={handleSkip}
            className="cursor-pointer w-full text-right"
          >
            Skip
          </div>
          <h3 class="flex items-center w-full mb-5">
            <span class="flex-grow bg-gray-200 rounded h-1"></span>
            <span class="mx-3 text-lg font-medium"></span>
            <span class="flex-grow bg-gray-200 rounded h-1"></span>
          </h3>
          {selectAddress ? (
            <div class="flex p-3 mb-5 gap-3 bg-white shadow-xl  rounded-xl overflow-hidden items-start justify-start">
              <div class="relative w-10 h-10 flex-shrink-0">
                <input
                  checked={defaultAddress}
                  handleChange={() => setChecked((prevState) => !prevState)}
                  type="checkbox"
                  class="checkbox-round"
                />
              </div>

              <div class=" gap-2 py-2">
                {/* <p class="text-xl font-bold">Mercy Johnson</p> */}

                <p class="text-gray-500">
                  {selectAddress?.address} {selectAddress?.city}{" "}
                  {selectAddress?.pincode}
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div class="flex flex-col gap-6 mx-auto mt-10">
            <div
              onClick={handlePickup}
              class="cursor-pointer shadow-md   text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl"
            >
              Deliver to this address
            </div>

            <div
              onClick={onOpenModal}
              class="cursor-pointer text-center shadow-md inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl"
            >
              Edit Address
            </div>
            <Modal open={open} onClose={onCloseModal} center>
              <Edit_Address_form data={selectAddress} />
            </Modal>
            <div class="cursor-pointer shadow-md text-center inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl">
              Add Delivery Instruction
            </div>
          </div>
          {addres?.map((item, i) => (
            <div class="flex p-3 gap-3 mt-5 bg-white shadow-xl  rounded-xl overflow-hidden items-center justify-start">
              <div class="relative w-10 h-10 flex-shrink-0 ">
                <input
                  checked={i === selected}
                  onChange={() => onChange(i)}
                  type="checkbox"
                  class="checkbox-round"
                />
              </div>

              <div class="flex flex-col gap-2 py-2 ">
                {/* <p class="text-xl font-bold">Mercy Johnson</p> */}

                <p class="text-gray-500">
                  {item.address} {item.city} {item.pincode}
                </p>
              </div>
            </div>
          ))}
          <details class="p-6 group" open>
            <summary class="flex items-center justify-between cursor-pointer">
              <h5 class="text-lg font-medium text-gray-900">Add New Address</h5>

              <span class="relative flex-shrink-0 ml-1.5 w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <Add_Address_form />
          </details>
        </div>
      </div>
    </>
  );
};

export default Add_Address;
