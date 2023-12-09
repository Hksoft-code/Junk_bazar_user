// import logo from './logo.svg';
import "./App.css";
import Homepage from "./Pages/Home.jsx";
import AboutUs from "./Pages/AboutPage.jsx";
import Pricing from "./Pages/PriceList.jsx";
import Nav from "./Common/Navbar/Nav.jsx";
import Footer from "./Common/Footer/Footer.jsx";
import ContactScreen from "./Pages/Contact.jsx";
import RequestPickup from "./Pages/PickupRequest.jsx";
// import Customer from './Auth/Pages/SignUp';
import {
    Route, Routes 
} from "react-router-dom";
// import Contactus from './Components/Contact/contactUs';
import CartList from "./Pages/CardList.jsx";
import UploadScrap from "./Pages/UploadScrap.jsx";
import OtpVerify from "./Auth/Pages/OtpVerify.jsx";
import SignIn from "./Auth/Pages/SingIn.jsx";
import SignUp from "./Auth/Pages/SignUp.jsx";

function App() {
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactScreen />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/request_pickup" element={<RequestPickup />} />
                <Route path="/cart" element={<CartList />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/upload-scrap" element={<UploadScrap />} />
                <Route path="/otp-verify" element={<OtpVerify />} />
            </Routes>
            <Footer />
        </div>

    );
}

export default App;
