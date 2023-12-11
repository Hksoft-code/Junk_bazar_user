import sellerIcon from "../../assets/SVG/seller-icon.svg";
import buyerIcon from "../../assets/SVG/buyer-icon.svg";
import team from "../../assets/PNG/TEAM 1.png";

import phone from "../../assets/PNG/APP 1.png";
import phone_2 from "../../assets/PNG/APP 2.png";
import Tutorial from "../Home/Tutorial.jsx";
import { useNavigate } from "react-router-dom";

const Treasure = () => {
    const navigate = useNavigate();
    return (
        <div>
            <main className="lg:pt-20 lg:px-8 flex justify-center items-center">
                <section className="grid grid-cols-1 lg:grid-cols-2 justify-around mx-5 px-4 md:px-0 lg:mx-14 text-zinc-500">
                    <aside className="order-2 lg:order-1 mt-10 lg:mt-0">
                        <section>
                            <img src={team} alt="junk-img" />
                        </section>
                    </aside>

                    <div className="lg:px-10 py-5 order-2 lg:order-1 mt-4">
                        <div className="text-black">
                            <h1 className="text-3xl lg:text-4xl font-bold font-['Gilroy-Bold'] leading-tight">
                                Shop for Treasures at Junk Bazar: Where Customers Turn Junk Into
                                Gems
                            </h1>
                        </div>
                        <div>
                            <p className="lg:max-w-[450px] mt-4">
                                Join JunkBazar community and join countless others who have
                                turned their clutter into profit
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

                        <div className="flex justify-start items-center">
                            <button onClick={() => navigate("/sign-up")} className="text-center text-white text-base font-semibold tracking-tight bg-lime-400 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-4 py-[.65rem] button">
                                Join Now
                            </button>
                            <button onClick={() => navigate("/faqs")} className="hidden text-center text-zinc-500 text-base font-semibold tracking-tight border-2 border-zinc-500 hover:bg-lime-400 hover:text-white hover:border-0 duration-200 lg:flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-4 py-[.45rem]">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Tutorial />

            <aside className="lg:mt-16 lg:px-8 flex justify-center items-center bg-lime-400 text-white lg:pb-6">
                <section className="grid grid-cols-1 lg:grid-cols-2 items-center">
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
                        <section className="flex justify-center lg:justify-end items-center lg:pt-3">
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
        </div>
    );
};

export default Treasure;
