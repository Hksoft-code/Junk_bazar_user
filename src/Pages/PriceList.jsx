// import React from "react";

import Footer from "../Common/Footer/Footer";
import Nav from "../Common/Navbar/Nav";
import PriceCardComponent from "../Components/PriceList/PriceCard";

const Pricing = () => {
    return (
        <>
            <Nav />
            <div className=" mt-20 lg:mt-32  lg:max-w-[1550px] mx-auto">
                <>
                    <div class="text-center p-10">
                        <h1 class="font-bold text-4xl mb-4">Rates Of JunkBazar Scraps</h1>
                    </div>
                    <PriceCardComponent />
                </>
            </div>
            <Footer />
        </>

    );
};

export default Pricing;