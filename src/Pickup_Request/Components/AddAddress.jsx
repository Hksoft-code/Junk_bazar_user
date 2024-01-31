import { useEffect, useState } from "react";
import "../styles/pickupRequest.css";
import { getAllAddress } from "../../Services/pickupRequest";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

import Edit_Address_form from "./Edit_Address_form";

const AddAddress = () => {
  const [addres, setAddress] = useState();
  const [checked, setChecked] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");
  const [defaultAddress, setDefault] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const location = useLocation();
  const passData = location.state ? location.state.passData : null;


  console.log("card data list", passData);

  // const ChangeAddress = () => {
  //   const payload = {
  //     scrapId: passData.scrapId,
  //     addToCartId: passData.addToCartId,
  //     scraplist: passData.scrapList,
  //   };
  //   navigate("/addAddress", {
  //     state: {
  //       payload,
  //     },
  //   });
  // };

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
    }
  };

  const handlePickup = async () => {
    const payload = {
      fullName: selectAddress.fullName,
      scrapId: passData.scrapId,
      stateCode: selectAddress.stateCode,
      countryCode: selectAddress.countryCode,
      addressId:selectAddress.addressId,  // addressId
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
  };

  return (
    <>
      <div className="">
        <div className="max-w-2xl mx-auto mt-24">
          {/* <div
            onClick={ChangeAddress}
            className="cursor-pointer w-full text-right"
          >
            Change
          </div> */}

          <h3 className="flex items-center w-full mb-5">
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
            <span className="mx-3 text-lg font-medium"></span>
            <span className="flex-grow bg-gray-200 rounded h-1"></span>
          </h3>
          {selectAddress ? (
            <div className="flex p-3 mb-5 gap-3 bg-white shadow-xl border-l-8 border-[#3CB043]  rounded-xl overflow-hidden items-start justify-start">
              <div className="relative w-10 h-10 flex-shrink-0">
                <input
                  checked={defaultAddress}
                  handleChange={() => setChecked((prevState) => !prevState)}
                  type="checkbox"
                  className="checkbox-round"
                />
              </div>

              <div className=" gap-2 py-2">
                <p className="text-xl font-bold">{selectAddress?.fullName}</p>

                <p className="text-gray-500">
                  {selectAddress?.address} {selectAddress?.city}{" "}
                  {selectAddress?.pincode}
                </p>
                <p className="text-gray-500">
                  {selectAddress?.dialCode} {selectAddress?.phoneNumber}
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex flex-col gap-6 mx-auto mt-10">
            <Link to="/addAddress">

            <div 
              className="cursor-pointer shadow-md  w-full text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl"
            
            >
               Add New Address
            </div>
            </Link>
            <div
              onClick={handlePickup}
              className="cursor-pointer shadow-md   text-center inline-block px-12 py-3 text-sm font-medium text-white bg-[#3CB043] focus:outline-none focus:ring rounded-3xl"
            >
              Pickup From this address
            </div>

            <div
              onClick={onOpenModal}
              className="cursor-pointer text-center shadow-md inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl"
            >
              Edit Address
            </div>
            <Modal open={open} onClose={onCloseModal} center>
              <Edit_Address_form data={selectAddress} />
            </Modal>
            {/* <div className="cursor-pointer shadow-md text-center inline-block px-12 border border-[#585858] py-3 text-sm font-medium text-[#585858]  focus:outline-none focus:ring rounded-3xl">
              Add Delivery Instruction
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
