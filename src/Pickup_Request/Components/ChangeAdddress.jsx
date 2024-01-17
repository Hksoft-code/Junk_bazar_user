import { useEffect, useState } from "react";
import { getAllAddress, raisedPickup } from "../../Services/pickupRequest";
import Add_Address_form from "./Add_Address_Form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangeAddress = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [addres, setAddress] = useState();
  const [checked, setChecked] = useState(false);
  const [selectAddress, setSelectAddress] = useState();
  const [Address, settedAddres] = useState();
  const [defaultAddress, setDefault] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const location = useLocation();
  const passData = location.state ? location.state.payload : null;
  console.log("change Address", passData);

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
  const onChange = (i) => {
    setSelected((prev) => (i === prev ? null : i));
    setSelectAddress(addres[selected]);
    console.log("selected Adddress ", selectAddress);
    settedAddres(selectAddress);
  };

  const handlePickup = async () => {
    console.log("pickup payload", Address);
    console.log("scraplist", passData.scraplist);
    const scraplist = passData.scraplist;
    const payload = {
      fullName: Address.fullName,
      scrapId: passData.scrapId,
      stateCode: Address.stateCode,
      countryCode: Address.countryCode,
      pincode: Address.pincode,
      dialCode: Address.dialCode,
      phoneNumber: Address.phoneNumber,
      address: Address.address,
      city: Address.city,
      addToCartId: passData.addToCartId,
      scraplist: scraplist,
    };

    console.log("pass pickup data ", payload);
    navigate("/summaryOrder", {
      state: {
        payload,
      },
    });

    // try {
    //   navigate("/summaryOrder", {
    //     replace: true,
    //   });
    //   const resp = await raisedPickup(
    //     Address.fullName,
    //     passData.scrapId,
    //     Address.stateCode,
    //     Address.countryCode,
    //     Address.pincode,
    //     Address.dialCode,
    //     Address.phoneNumber,
    //     Address.address,
    //     Address.city,
    //     passData.addToCartId
    //   );

    //   console.log("pickup request", resp);

    //   if (resp.statusCode === 200) {

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
      <div class="max-w-2xl mx-auto mt-24">
        <details class="p-6 group">
          <summary class="flex items-center justify-between cursor-pointer">
            <h5 class="text-lg font-medium text-gray-900">Add New Address</h5>

            <span class="relative flex-shrink-0 ml-1.5 w-5 h-5">
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
            </span>
          </summary>

          <Add_Address_form />
        </details>
        {addres?.map((item, i) => (
          <div class=" border-l-8 border-[#3CB043] flex p-3 gap-3 mt-5 bg-white shadow-xl  rounded-xl overflow-hidden items-center justify-start">
            <div class="relative w-10 h-10 flex-shrink-0 ">
              <input
                checked={i === selected}
                onChange={() => onChange(i)}
                type="checkbox"
                class="checkbox-round"
              />
            </div>

            <div class="flex flex-col gap-2 py-2 ">
              <p class="text-xl font-bold">{item.fullName}</p>

              <p class="text-gray-500">
                {item.address} {item.city} {item.pincode}
              </p>
              <p class="text-gray-500">
                {item?.dialCode} {item?.phoneNumber}
              </p>
            </div>
          </div>
        ))}

        <div
          onClick={handlePickup}
          class="cursor-pointer mt-20 w-full shadow-md text-center inline-block px-12 bg-[#3CB043] py-3 text-sm font-medium text-white  focus:outline-none focus:ring rounded-3xl"
        >
          DELIVER HERE
        </div>
      </div>
    </>
  );
};

export default ChangeAddress;
