import { useCallback } from "react";
import Banner from "../Components/Home/banner";

import search_icon from "../assets/SVG/Search Icon.svg";
import phone from "../assets/PNG/junkbazar 1.png";
import apple_logo from "../assets/SVG/Vector (1).svg";
import playstore_logo from "../assets/SVG/Vector.svg";
import About from "../Components/Home/About";
import Treasure from "../Components/Home/Treasure";
import Tutorial from "../Components/Home/Tutorial";
import Faq from "../Components/Home/Faq";
import Results from "../Components/Home/Result";
import Footer from "../Common/Footer/Footer";
import Nav from "../Common/Navbar/Nav";
const Homepage = () => {
    return (
        <div>
           
            <Banner />
            <About />
            <Treasure />
            <Tutorial />
            <Faq />
            <Results />
           
        </div>
    )

};

export default Homepage; 