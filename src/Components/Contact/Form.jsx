import React, { useState } from 'react';
import map from "../../assets/PNG/map.png";

const Form = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    address: '',
    message: '',
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSend = () => {
    const { fullName, phoneNumber, pincode, address, message } = formData;
    const whatsappMessage = `Hi, I would like to inquire:\n\nFull Name: ${fullName}\nPhone Number: ${phoneNumber}\nPincode: ${pincode}\nAddress: ${address}\nMessage: ${message}`;
    
    const whatsappLink = `https://wa.me/+916374380946?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[80%] flex-wrap">
        <div className="w-full md:w-[50%] mb-4 md:mb-0">
          {['fullName', 'phoneNumber', 'pincode', 'address', 'message'].map((field) => (
            <div key={field} className="col-span-6 sm:col-span-3">
              <div>
                <label className="block py-3 text-black">{field === 'message' ? 'Message' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                  {field === 'message' ? (
                    <textarea
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  ) : (
                    <input
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-left items-center">
            <button
              onClick={handleSend}
              className="text-center text-white text-base font-semibold tracking-tight bg-lime-400 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-12 py-[.65rem]"
            >
              Send
            </button>
          </div>
        </div>

        <div className=" w-full md:w-[40%] h-[200px] md:h-auto">
          <img
            src={map}
            alt="Map"
            className=" inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
