import { useEffect, useState } from "react";
import addressDot from "../../assets/PNG/addressDot.png";
import Add_Address_form from "./Add_Address_Form";
import Confirm from "./PopUp/popup";
import "../styles/pickupRequest.css";
import { getAllAddress } from "../../Services/pickupRequest";
import showErrorMessage from "../../utils/ErrorAlert";

const Add_Address = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [addres, setAddress] = useState();
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    console.log("open", formOpen);
  };

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    try {
      const allAddress = await getAllAddress();
      console.log("user login from Service File", allAddress);
      setAddress(allAddress.address);
    } catch (error) {
      console.error("error", error);
      const errorMessage = !error.response.data.error.message
        ? error.response.data.error?._message
        : error.response.data.error.message;
      showErrorMessage(errorMessage, "error");
    }
  };

  return (
    <>
      <div className="">
        <div class="max-w-2xl mx-auto mt-24">
          {addres?.map((item) => (
            <div class="flex p-5 mb-5 gap-3 bg-white border border-[#585858] rounded-xl overflow-hidden items-start justify-start">
              <div class="relative w-10 h-10 flex-shrink-0">
                <input
                  value={checked}
                  handleChange={() => setChecked((prevState) => !prevState)}
                  type="checkbox"
                  class="checkbox-round"
                />
              </div>

              <div class="flex flex-col gap-2 py-2">
                {/* <p class="text-xl font-bold">Mercy Johnson</p> */}

                <p class="text-gray-500">
                  {item.address} {item.city} {item.pincode}
                </p>
              </div>
            </div>
          ))}
          <div class="flex flex-col gap-6 mx-auto mt-10">
            <div class="text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl">
              Deliver to this address
            </div>

            <div class="text-center inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl">
              Edit Address
            </div>
            <div class="text-center inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl">
              Add Delivery Instruction
            </div>
          </div>
          {/* <div class="flex p-2 gap-3 mt-5 bg-white border border-[#585858]  rounded-xl overflow-hidden items-center justify-start">
            <div class="relative w-10 h-10 flex-shrink-0 mx-auto">
              <input type="checkbox" class="checkbox-round" />
            </div>

            <div class="flex flex-col gap-2 py-2 ">
              <p class="text-xl font-bold">Mercy Johnson</p>

              <p class="text-gray-500">
                4517 Washington Ave. ManchesterKentucky 39495 Phone Number: +91
                349045234
              </p>
            </div>
          </div> */}
          <div class="flex p-2 gap-3 mt-5 bg-white   rounded-xl overflow-hidden items-center justify-start">
            <div class="flex flex-col gap-2 py-2 ">
              <p class="text-xl font-bold">Add New Address </p>
            </div>
            <div class="relative w-10 h-10 flex-shrink-0 mx-auto text-end">
              <img
                onClick={handleClick}
                handleChange={() => setFormOpen((prevState) => !prevState)}
                class="absolute right-0 items-end cursor-pointer top-0 w-full h-full object-cover object-center transition duration-50"
                loading="lazy"
                src="https://cdn-icons-png.flaticon.com/512/32/32339.png"
              />
            </div>
          </div>

          <Add_Address_form />
        </div>
      </div>
    </>
  );
};

export default Add_Address;
