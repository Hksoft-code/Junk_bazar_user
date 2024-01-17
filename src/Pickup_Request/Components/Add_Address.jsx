import { useEffect, useState } from "react";
import "../styles/pickupRequest.css";
import { getAllAddress, raisedPickup } from "../../Services/pickupRequest";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Edit_Address_form from "./Edit_Address_form";
import ChangeAddress from "./ChangeAdddress";
import Swal from "sweetalert2";

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
  console.log("card data list", passData);

  const ChangeAddress = () => {
    const payload = {
      scrapId: passData.scrapId,
      addToCartId: passData.addToCartId,
      scraplist: passData.scrapList,
    };
    navigate("/changeAddress", {
      state: {
        payload,
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
      console.log("selected Address", selectAddress);
    } catch (error) {
      console.error("error", error);
      // const errorMessage = !error.response?.data.error.message
      //   ? error.response.data.error?._message
      //   : error.response.data.error.message;
      // showErrorMessage(errorMessage, "error");
    }
  };

  const handlePickup = async () => {
    const payload = {
      fullName: selectAddress.fullName,
      scrapId: passData.scrapId,
      stateCode: selectAddress.stateCode,
      countryCode: selectAddress.countryCode,
      pincode: selectAddress.pincode,
      dialCode: selectAddress.dialCode,
      phoneNumber: selectAddress.phoneNumber,
      address: selectAddress.address,
      city: selectAddress.city,
      addToCartId: passData.addToCartId,
      scraplist: passData.scrapList,
    };
    navigate("/summaryOrder", {
      state: {
        payload,
      },
    });
    // try {
    //   const resp = await raisedPickup(
    //     selectAddress.fullName,
    //     passData.scrapId,
    //     selectAddress.stateCode,
    //     selectAddress.countryCode,
    //     selectAddress.pincode,
    //     selectAddress.dialCode,
    //     selectAddress.phoneNumber,
    //     selectAddress.address,
    //     selectAddress.city,
    //     passData.addToCartId
    //   );

    //   if (resp.statusCode === 200) {
    //     navigate("/Success-page", {
    //       replace: true,
    //     });
    //   }
    // } catch (error) {
    //   if (error?.response) {
    //     const data = error?.response?.data;
    //     if (data?.error?.statusCode === 400) {
    //       const mess = data.error;
    //       Swal.fire({
    //         icon: "error",
    //         position: "center",
    //         showConfirmButton: false,
    //         timer: 2500,
    //         title: mess._message,
    //       });
    //     }

    //     console.log("Status", error.response.status);
    //     console.log("Headers", error.response.headers);
    //   } else if (error.request) {
    //     // Client made a request but response is not received
    //     console.log("<<<<<<<Response Not Received>>>>>>>>");
    //     console.log(error.request);
    //   } else {
    //     // Other case
    //     console.log("Error", error.message);
    //   }
    // }
  };

  return (
    <>
      <div className="">
        <div class="max-w-2xl mx-auto mt-24">
          <div
            onClick={ChangeAddress}
            className="cursor-pointer w-full text-right"
          >
            Change
          </div>

          <h3 class="flex items-center w-full mb-5">
            <span class="flex-grow bg-gray-200 rounded h-1"></span>
            <span class="mx-3 text-lg font-medium"></span>
            <span class="flex-grow bg-gray-200 rounded h-1"></span>
          </h3>
          {selectAddress ? (
            <div class="flex p-3 mb-5 gap-3 bg-white shadow-xl border-l-8 border-[#3CB043]  rounded-xl overflow-hidden items-start justify-start">
              <div class="relative w-10 h-10 flex-shrink-0">
                <input
                  checked={defaultAddress}
                  handleChange={() => setChecked((prevState) => !prevState)}
                  type="checkbox"
                  class="checkbox-round"
                />
              </div>

              <div class=" gap-2 py-2">
                <p class="text-xl font-bold">{selectAddress?.fullName}</p>

                <p class="text-gray-500">
                  {selectAddress?.address} {selectAddress?.city}{" "}
                  {selectAddress?.pincode}
                </p>
                <p class="text-gray-500">
                  {selectAddress?.dialCode} {selectAddress?.phoneNumber}
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
            {/* <div class="cursor-pointer shadow-md text-center inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl">
              Add Delivery Instruction
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Address;
