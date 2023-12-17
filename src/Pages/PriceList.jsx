// import React from "react";

import Footer from "../Common/Footer/Footer";
import Nav from "../Common/Navbar/Nav";
import PriceCardComponent from "../Components/PriceList/PriceCard";

const Pricing = () => {
    return (
        <>
            <Nav />
            <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
                <h2 className="mt-5 text-3xl text-center font-extrabold">Rates Of Scrap Bazar</h2>
                <div className="pricing-lists">
                    <PriceCardComponent />
                </div>
            </div>
            <Footer />
        </>

    );
};

export default Pricing;