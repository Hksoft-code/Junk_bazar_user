import search_icon from "../../assets/SVG/Search Icon.svg";
import phone from "../../assets/PNG/junkbazar 1.png";
import apple_logo from "../../assets/SVG/Vector (1).svg";
import playstore_logo from "../../assets/SVG/Vector.svg";


const Banner = () => {

  return (
    <main className="shadow-[0_25px_40px_-15px_rgba(0,0,0,0.1)] lg:mb-8">
      <section className="max-w-[1200px] mx-auto relative lg:pt-10 mt-10 lg:mt-16">
        <div className="grid md:grid-cols-2 ml-2 md:ml-5  justify-around lg:items-center">
          <div className="w-full max-w-[600px] lg:mt-6">
            {/* <div className="shadow-xl shadow-zinc-200 py-2 rounded px-5 text-zinc-400 w-10/12 hidden lg:flex">
              <input
                type="search"
                name="search"
                id="search"
                className="p-2 w-full outline-none"
              />
              <select
                name="categories"
                id="categories"
                className="w-1/2 outline-none"
              >
                <option value="" className="p-3 bg-lime-500 text-white">
                  Search
                </option>
                <option value="items">Items</option>
                <option value="collections">Collection</option>
                <option value="creators">Creators</option>
              </select>
              <div className="bg-white p-3 ">
                <img
                  src={search_icon}
                  alt="search-icon"
                  className="w-[2.5rem] cursor-pointer"
                
                />
              </div>
            </div> */}

            <div className="pt-1 md:pt-20 font-['Gilroy-Regular'] lg:font-['Gilroy-Heavy'] font-bold">
              <h1 className="text-4xl lg:text-5xl lg:font-extrabold font-bold">
                Welcome to
              </h1>
              <h1 className="text-lime-primary text-5xl lg:text-6xl lg:font-extrabold font-bold">
                Junkbazar
              </h1>
              <p className=" w-[300px] md:w-[350px] lg:w-[370px] text-zinc-500 text-base lg:text-lg font-normal font-['Gilroy-Regular'] leading-normal tracking-tight">
                Online platform for scrap solution, present in all major cities
              </p>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-center md:justify-start">
                <div className="flex justify-between items-center mr-6 bg-black px-2 lg:px-3 py-2 text-white rounded">
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

                {/* <div className="flex justify-between items-center mr-6 bg-black px-2 lg:px-3 py-2 text-white rounded">
                  <img
                    src={apple_logo}
                    alt="playstore-logo"
                    className="relative w-5 mr-2"
                  />
                  <span className="text-xs">
                    Download on the <br />
                    <span className="text-base font-bold"> App Store</span>
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-0">
          <div className="relative">
  <img
    src={phone}
    alt="junk-bazzar-phone"
    className="w-[350px] md:w-[400px] lg:w-[520px] lg:h-[543px] rounded-[35px]"
  />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Banner;