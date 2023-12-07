import { useEffect } from "react";
import phone_guy from "../assets/PNG/about-img.png"
import apple_logo from "../assets/SVG/Vector (1).svg";
import playstore_logo from "../assets/SVG/Vector.svg";
import Junk from "../Components/AboutUs/Junk";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";

const AboutUs = () => {
 useEffect(() => {
   window.scrollTo(0, 0);
 }, []);

  return (
    <div>
    
      <main className="shadow-[0_25px_40px_-15px_rgba(0,0,0,0.1)] lg:mb-8">
        <section className="max-w-[1200px] mx-auto relative lg:pt-10 mt-10 lg:mt-16">
          <div className="grid md:grid-cols-2 ml-2 md:ml-5 justify-between lg:items-start ">
            <div className="w-full lg:max-w-[600px] mt-10 lg:mt-6 lg:pl-20 pl-4 md:pl-10">
              <div className=" font-['Gilroy-Regular'] lg:font-['Gilroy-Bold'] font-bold lg:pt-14">
                <h1 className="text-4xl lg:text-5xl lg:font-extrabold font-bold">
                  About Us
                </h1>
                <p className=" w-[300px] md:w-[350px] lg:w-[370px] text-zinc-500 text-base lg:text-lg font-normal font-['Gilroy-Regular'] leading-normal tracking-tight pt-2">
                  Online platform for scrap solution, present in all major
                  cities
                </p>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-center md:justify-start">
                  <div className="flex justify-between items-center mr-6 bg-black px-4 lg:px-3 py-2 text-white rounded">
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
            </div>

            <div className="mt-16 lg:mt-0">
              <div>
                <img
                  src={phone_guy}
                  alt="junk-bazzar-phone"
                  className="w-[350px] md:w-[400px] lg:w-[520px] lg:h-[543px] rounded-[35px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
        <Junk />
        
    </div>
  );
};

export default AboutUs;
