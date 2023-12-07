import heroPic from "../../assets/PNG/herobig.png";
import apple_logo from "../../assets/SVG/Vector (1).svg";
import playstore_logo from "../../assets/SVG/Vector.svg";

const Hero = () => {
  return (
    <div className="w-full bg-white flex justify-center items-center shadow-lg mt-[100px] lg:mb-[50px]">
      <div className="w-full  flex flex-col md:flex-row justify-around items-center p-1 md:m-1">
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl lg:text-2xl text-gray-500 mb-8">
            Online platform for scrap solution, present in{" "}
            <br className="hidden lg:block" />
            all major cities
          </p>
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex justify-between items-center mr-4 bg-black px-3 lg:px-3 py-2 text-white rounded">
              <img
                src={playstore_logo}
                alt="playstore-logo"
                className="relative w-5 mr-2"
              />
              <span className="text-xs">
                Get it on <br />
                <span className="text-base font-bold"> Google Play</span>
              </span>
            </div>

            <div className="flex justify-between items-center mr-6 bg-black px-4 lg:px-3 py-2 text-white rounded">
              <img
                src={apple_logo}
                alt="playstore-logo"
                className="relative w-5 mr-2"
              />
              <span className="text-xs">
                Download on the <br />
                <span className="text-base font-bold"> App Store</span>
              </span>
            </div>
          </div>
        </div>
        {/* image */}
        <div className="mt-6 md:mt-0">
          <img className="w-full md:w-auto" src={heroPic} alt="Hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;