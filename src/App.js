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
import OrderSuccessful from "./Pages/OrderSuccessfull.jsx";
import Faqs from "./Pages/Faqs.jsx";
import CardPage from "./Pages/CardPage.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import TrackOrderDetails from "./Components/TrackOrder/TrackOrderDetails.jsx";
import SignInTest from "./Auth/Pages/SignInTest.jsx";
import AddressVerify from "./Auth/Pages/addressVerify.jsx";

function App() {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactScreen />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/request_pickup" element={<RequestPickup />} />
                <Route path="/cart" element={<CardPage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/upload-scrap" element={<UploadScrap />} />
                <Route path="/otp-verify" element={<OtpVerify />} />
                <Route path="/Success-page" element={<OrderSuccessful />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/addressVerify" element={<AddressVerify />} />
                <Route path="/trackOrder" element={<TrackOrder />} />
                <Route path="/trackOrderDetails" element={<TrackOrderDetails />} />
            </Routes>

        </div>

    );
}

export default App;
