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

const addAddrress = async (city, countryCode, stateCode, address, pincode) => {
  const payload = {
    city,
    countryCode,
    stateCode,
    address,
    pincode,
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

const editAddrress = async (city, countryCode, stateCode, address, pincode,addressId) => {
  const payload = {
    city,
    countryCode,
    stateCode,
    address,
    pincode,
    addressId
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

const raisedPickup = async (fullName,scrapIds,stateCode,countryCode,pincode,dialCode,phoneNumber,address,city,addToCartId) => {
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
  };
  try {
    const response = await axiosInstance.post("/raisePickUp", payload);

    const pickupRequest = JSON.parse(response.data.data);

    console.log("Rise Pickup Request", pickupRequest);
    return pickupRequest;
  } catch (error) {
    console.error("Error Will Adding Address", error);

    throw error; // Rethrow the error to propagate it to the calling code
  }
}

export { getAllAddress, addAddrress ,raisedPickup,editAddrress};
