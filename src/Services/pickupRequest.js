import axiosInstance from "../api-config/axiosInstance";

const getAllAddress = async () => {
  try {
    const response = await axiosInstance.get("/getAddress?page=0&limit=10");

    const address = JSON.parse(response.data.data);

    console.log("getAddress", address);
    return address;
  } catch (error) {
    console.error("Error Will getting All Address", error);

    throw error; // Rethrow the error to propagate it to the calling code
  }
};

const addAddrress = async (city, countryCode, stateCode, address, pincode, fullName,dialCode,phoneNumber) => {
  const payload = {
    city,
    countryCode,
    stateCode,
    address,
    pincode,
    fullName,
    dialCode,
    phoneNumber
  };

  try {
    const response = await axiosInstance.post("/addAddress", payload);

    const address = JSON.parse(response.data.data);

    console.log("Add Address", address);
    return address;
  } catch (error) {
    console.error("Error Will Adding Address", error);

    throw error; // Rethrow the error to propagate it to the calling code
  }
};

const editAddrress = async (fullName,city,countryCode,stateCode,address,pincode,addressId,phoneNumber,dialCode) => {

  const payload = {
    fullName,
    city,
    countryCode,
    stateCode,
    address,
    pincode,
    addressId,
    phoneNumber,
    dialCode
  };

  try {
    const response = await axiosInstance.post("/editAddress", payload);

    const address = JSON.parse(response.data.data);

    console.log("Add Address", address);
    return address;
  } catch (error) {
    console.error("Error Will Adding Address", error);

    throw error; // Rethrow the error to propagate it to the calling code
  }
};

const raisedPickup = async (fullName,scrapIds,stateCode,countryCode,pincode,dialCode,phoneNumber,address,city,addToCartId,addressId) => {
  const payload = {
    fullName,
    scrapIds,
    stateCode,
    countryCode,
    pincode,
    dialCode,
    phoneNumber,
    address,
    city,
    addToCartId,
    addressId
  };
  try {
    const response = await axiosInstance.post("/raisePickUp", payload);

    const pickupRequest = response.data;

    console.log("Rise Pickup Request", pickupRequest);
    return pickupRequest;
  } catch (error) {
    console.error("Error Will Adding Address", error);

    throw error; // Rethrow the error to propagate it to the calling code
  }
}

export { getAllAddress, addAddrress ,raisedPickup,editAddrress};
