// import { useCallback } from "react";
import Banner from "../Components/Home/banner.jsx";

// import search_icon from "../assets/SVG/Search Icon.svg";
// import phone from "../assets/PNG/junkbazar 1.png";
// import apple_logo from "../assets/SVG/Vector (1).svg";
// import playstore_logo from "../assets/SVG/Vector.svg";
import About from "../Components/Home/About.jsx";
import Treasure from "../Components/Home/Treasure.jsx";
import Tutorial from "../Components/Home/Tutorial.jsx";
import Faq from "../Components/Home/Faq.jsx";
import Results from "../Components/Home/Result.jsx";
import Nav from "../Common/Navbar/Nav.jsx";
import Footer from "../Common/Footer/Footer.jsx";
import { useEffect } from "react";
import axiosInstance from "../api-config/axiosInstance.js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/user/userSlice.js";
// import Footer from "../Common/Footer/Footer";
// import Nav from "../Common/Navbar/Nav";
const Homepage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const readCart = useSelector((state) => state.cart);
    const dispatch = useDispatch(0);
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/getAddToCart');
            const scrapList = JSON.parse(response.data.data);
            console.log('scrapList', scrapList);
            dispatch(addToCart(scrapList));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div>
            <Nav />
            <Banner />
            <About />
            <Treasure />
            <Tutorial />
            <Faq />
            <Results />
            <Footer />
        </div>
    );
};

export default Homepage; 