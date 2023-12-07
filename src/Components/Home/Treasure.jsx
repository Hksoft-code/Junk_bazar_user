import money_bag from "../../assets/PNG/money-bag.png";
import sellerIcon from "../../assets/SVG/seller-icon.svg"
import buyerIcon from "../../assets/SVG/buyer-icon.svg"
import { useNavigate } from "react-router-dom";


const Treasure = () => {
  const navigate = useNavigate()
  return (
    <main className="lg:pt-40 lg:px-8 flex justify-center items-center">
      <section className="grid grid-cols-1 lg:grid-cols-2 justify-around md:mx-5 px-4 md:px-0 lg:mx-14 text-zinc-500">
        <aside className="order-2 lg:order-1 mt-10 lg:mt-0">
          <section>
            <img src={money_bag} alt="junk-img" />
          </section>
        </aside>

        <div className="lg:px-10 py-5 order-2 lg:order-1">
          <div className="text-black">
            <h1 className="text-3xl lg:text-4xl font-bold font-['Gilroy-Regular'] leading-tight">
              Shop for Treasures at Junk Bazar: Where Customers Turn Junk Into
              Gems
            </h1>
          </div>
          <div>
            <p className="lg:max-w-[450px] text-center md:text-start">
              Join JunkBazar community and join countless others who have turned
              their clutter into profit
            </p>
          </div>

          <section className="flex justify-between md:justify-center lg:justify-between  lg:w-3/4 items-center my-5 text-sm">
            <aside className="md:mr-24">
              <div>
                <img src={sellerIcon} alt="icon" className="w-7" />
              </div>
              <h4 className="font-bold text-black max-w-[130px]">
                Get Paid as Sellers
              </h4>
              <p className="max-w-[120px]">
                Register as seller and get paid for your scraps
              </p>
            </aside>

            <aside className="ml-2">
              <div>
                <img src={buyerIcon} alt="icon" className="w-7" />
              </div>
              <h4 className="font-bold text-black max-w-[130px]">
                Get Scraps as Buyers
              </h4>
              <p className="max-w-[120px]">
                Register as buyer and scrap without hassel
              </p>
            </aside>
          </section>

          <div className="flex justify-center lg:justify-start items-center">
            <button  className="text-center text-white text-base font-normal tracking-tight border-2 border-lime-400 bg-lime-400 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-[.5rem] md:px-[1rem] py-[.65rem] md:font-bold">
              Get Started as Vendor
            </button>
            <button  onClick={() => navigate("upload-scrap")} className="text-center text-zinc-500 text-base font-normal tracking-tight border-2 h border-zinc-500 hover:bg-lime-400 hover:text-white hover:border-2 hover:border-lime-400 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-[.5rem] md:px-[1rem] py-[.5rem] md:font-bold">
              sell your scrap
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Treasure;
