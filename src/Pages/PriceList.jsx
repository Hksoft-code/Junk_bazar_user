// import React from "react";

import Footer from "../Common/Footer/Footer";
import Nav from "../Common/Navbar/Nav";
import PriceCardComponent from "../Components/PriceList/PriceCard";

const Pricing = () => {
    return (
        <>
            <Nav />
            <div className=" mt-20 lg:mt-32  lg:max-w-[1550px] mx-auto">
                <div className="text-center text-[96px] font-['Gilroy-Bold'] tracking-[0.2] text-[#060714] ">
                    Rates Of JunkBazar Scraps
                </div>
                <div className="pricing-lists">
                    <PriceCardComponent />
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Pricing;