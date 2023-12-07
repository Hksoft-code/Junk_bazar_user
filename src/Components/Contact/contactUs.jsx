import mail from "../../assets/PNG/mail.png";
import call from "../../assets/PNG/call.png";
import location from "../../assets/PNG/location.png";

const Contactus = () => {
  return (
    <div className="w-full flex justify-center items-center lg:mt-[30px] mb:30 lg:mb-[85px]">
      <div className="w-full md:w-[90%] lg:w-[90%] flex justify-between items-center flex-wrap p-4">
        <div className="flex justify-center items-center flex-col w-full md:w-1/3 p-4">
          <img src={mail} alt="Mail" className="max-w-full h-24" />
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 font-bold text-black">
            Send Us a mail
          </h1>
          <p className="text-lg font-medium text-center text-gray-600">
            send us a mail at <br /> info@junkbazar.com
          </p>
        </div>
        <div className="flex justify-center items-center flex-col w-full md:w-1/3 p-4">
          <img src={call} alt="Call" className="max-w-full h-24" />
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 font-bold text-black">
            Call For Help
          </h1>
          <p className="text-lg font-medium text-center text-gray-600">
            You can reach us via a phone call: <br />
            91 9709709248
          </p>
        </div>
        <div className="flex justify-center items-center flex-col w-full md:w-1/3 p-4">
          <img src={location} alt="Location" className="max-w-full h-28" />
          <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 font-bold text-black">
            Visit Us
          </h1>
          <p className="text-lg font-medium text-center text-gray-600">
            234, Knight St Cedar Lake, <br />
            Groove Estate, Mumbai, India
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contactus;