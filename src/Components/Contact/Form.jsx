import map from "../../assets/PNG/map.png";

const Form = () => {
 

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[80%] flex-wrap">
        <div className="w-full md:w-[50%] mb-4 md:mb-0">
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black"> Full Name</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  placeholder="Full Name"
                  className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Phone Number</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  placeholder="phone number"
                  className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Pincode</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  placeholder="Pincode"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Address</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <input
                  placeholder="Address"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div>
              <label className="block py-3 text-black">Message</label>
              <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
                <textarea
                  placeholder="Message"
                  className="w-full pr-3 p-1 ml-3 text-black outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-left items-center">
            <button
            //   onClick={() => navigate("/faqs")}
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
