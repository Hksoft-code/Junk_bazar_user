// import {
//     useCallback 
// } from "react";
import ScrapDetailsPage from "../Components/ScrapDetails/ScrapDetailsPage";

const ScrapDetails = () => {
    return (
        <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
            <h2 className="mt-5 text-3xl text-center font-extrabold">Vehicle Scrap</h2>
            <div className="pricing-lists">
                <ScrapDetailsPage />
            </div>
        </div>
    );
};

export default ScrapDetails;
