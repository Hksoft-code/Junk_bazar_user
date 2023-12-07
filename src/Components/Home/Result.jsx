import artWork from "../../assets/SVG/Artworks Icon.svg";
import artist from "../../assets/SVG/Artists Icon.svg";
import wallet from "../../assets/SVG/Wallet Icon.svg";
import user from "../../assets/SVG/User Icon.svg";
import phone from "../../assets/PNG/APP 1.png";
import phone_2 from "../../assets/PNG/APP 2.png"

const Results = () => {
  return (
    <main className="max-w-[1200px] mx-auto lg:my-9 my-3 mb-5 md:mb-0 pb-5 md:pb-0 py-3 lg:py-9 md:my-5 md:py-5">
      <section className="grid grid-cols-2 md:grid-cols-4 max-w-[700px] mx-auto">
        <aside className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center p-4">
            <img src={user} alt="user-icon" className="w-5" />
            <h1 className="p-.5 text-3xl font-bold">300k</h1>
            <p className="text-xs text-zinc-500">Users Active</p>
          </div>
        </aside>
        <aside className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center p-4">
            <img src={artWork} alt="artwork-icon" className="w-5" />
            <h1 className="p-.5 text-3xl font-bold">1M+</h1>
            <p className="text-xs text-zinc-500">Transactions</p>
          </div>
        </aside>
        <aside className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center p-4">
            <img src={artist} alt="artist-icon" className="w-5" />
            <h1 className="p-.5 text-3xl font-bold">36M</h1>
            <p className="text-xs text-zinc-500">Scraps Sold</p>
          </div>
        </aside>
        <aside className="flex justify-center items-center">
          <div className="flex flex-col items-center justify-center p-4">
            <img src={wallet} alt="walllet-icon" className="w-5" />
            <h1 className="p-.5 text-3xl font-bold">12M+</h1>
            <p className="text-xs text-zinc-500">Money Paid Out</p>
          </div>
        </aside>
      </section>

      <aside className="lg:mt-16 lg:px-8 flex justify-center items-center bg-lime-400 text-white lg:pb-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 items-start">
          <div className="py-5 order-2 lg:order-1 px-3 lg:px-0">
            <div className="my-2">
              <h1 className="text-xs tracking-widest">DOWNLOAD OUR APP</h1>
            </div>
            <div className="">
              <h1 className="text-3xl lg:text-4xl font-bold font-['Gilroy-Regular'] leading-tight py-1 pb-5 lg:max-w-[400px]">
                Join JunkBazar as a vendor
              </h1>
            </div>
            <div>
              <p className="lg:max-w-[450px]">
                Want to take your JunkBazar experience to the next level? Look
                no further! Download our user-friendly app for a seamless and
                convenient way to buy
              </p>
            </div>
            <div className="flex items-center mt-4">
              <button className="text-center text-white text-base font-semibold tracking-tight bg-transparent border-white border-2 hover:bg-white hover:text-lime-500  duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-4 py-[.40rem]">
                Click here to download
              </button>
            </div>
          </div>

          <aside className="order-2 lg:order-1 mt-10 md:mt-4 lg:mt-0 hidden lg:block">
            <section className="flex justify-center lg:justify-end items-start lg:pt-3">
              <img src={phone} alt="phone-img" className="w-56" />
            </section>
          </aside>
          <aside className="order-2 lg:order-1 mt-10 md:mt-4 lg:mt-0 lg:hidden">
            <section className="flex justify-center lg:justify-end items-start lg:pt-3">
              <img src={phone_2} alt="phone-img" className="w-56" />
            </section>
          </aside>
        </section>
      </aside>
    </main>
  );
};

export default Results;
