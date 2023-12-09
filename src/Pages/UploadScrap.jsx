import React, { useEffect, useState } from "react";
import phone_guy from "../assets/PNG/about-img.png";
import axios from "axios";
import Swal from "sweetalert2";
import {serverUrl} from "../api-config/config";

const UploadScrap = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [kilogram, setKilogram] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const previewUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(previewUrl);
    console.log(preview);
  };

  const varName = localStorage.getItem("token");
  console.log(varName);
  const uploadData = async () => {

    const formData = new FormData();
    formData.append("scrapName", name);
    formData.append("scrapImage", image);
    formData.append("quantityType", quantity);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("kilogram", kilogram);
    formData.append("stateCode", kilogram);
    formData.append("countryCode", 'IN');
    
    
    const headers = {
      "Content-Type": "multipart/form-data",
      'Authorization': `Bearer ${varName}`,
      'platform':'web'
    };

    await axios
      .post(`${serverUrl}/addScrap`, formData, { headers: headers })
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Uploaded successfully ",
          showConfirmButton: false,
          timer: 2500,
        });
      })

      .catch((error) => {
        // Handle the error here
        console.error("Axios Error:", error);
      });
  };

  return (
    <div className="w-full flex justify-center  p-4 md:mt-[150px] sm:mt-[20px] ">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center w-full md:w-[80%] flex-wrap">
        <div className=" w-full md:w-[40%] h-[300px] md:h-[700px]  mb-[30px]">
          <img
            src={phone_guy}
            alt="Map"
            className=" inset-0 w-full h-full object-cover sm:object-contain sm:mt-[0] mt-14"
          />
        </div>
        <div className="w-full md:w-[50%] mb-4 md:mb-0 shadow-lg p-[20px]">
          <div className="w-[100%] p-[10px]">
            <h1 className="text-[45px] font-bold text-black text-center">
              Upload Scrap
            </h1>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Enter Scrap Name</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter Scrap Name"
                  className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">
                Enter Your Location
              </label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  placeholder="Enter Your Location"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">
                Enter Available Quantity
              </label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  placeholder="Enter Available Quantity"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Enter Price</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  placeholder="Enter Price"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Kilogram</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c] mb-[20px]">
                <input
                  placeholder="input kg"
                  onChange={(e) => {
                    setKilogram(e.target.value);
                  }}
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="" htmlFor="">
              Upload Scrap image
            </label>
            <div className="relative">
              <label
                htmlFor="pix"
                className="cursor-pointer block bg-[#80d7421c] border border-gray-300 hover:border-gray-400 rounded-md p-4 text-center"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="scrap"
                    className="mx-auto h-32 object-cover rounded-md mb-4"
                  />
                ) : (
                  <span className="text-gray-500 ">Upload Scrap Image</span>
                )}
              </label>
              <input
                id="pix"
                type="file"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>
          <br />

          <br />
          <div className="col-span-6 sm:col-span-3">
            <button
              onClick={uploadData}
              className="w-full h-[50px] text-white font-extrabold bg-[#81D742] rounded-[30px]"
            >
              Confirm
            </button>
          </div>

          {/* <div>
                <p>Don't have an account?</p>
              </div> */}
        </div>
      </div>
    </div>
  );
};

export default UploadScrap;
