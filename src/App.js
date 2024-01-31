// import logo from './logo.svg';
import "./App.css";
import Homepage from "./Pages/Home.jsx";
import AboutUs from "./Pages/AboutPage.jsx";
import Pricing from "./Pages/PriceList.jsx";
// import Nav from "./Common/Navbar/Nav.jsx";
// import Footer from "./Common/Footer/Footer.jsx";
import ContactScreen from "./Pages/Contact.jsx";
import RequestPickup from "./Pages/PickupRequest.jsx";
// import Customer from './Auth/Pages/SignUp';
import { Route, Routes } from "react-router-dom";
// import Contactus from './Components/Contact/contactUs';
// import CartList from "./Pages/CardList.jsx";
import UploadScrap from "./Pages/UploadScrap.jsx";
import OtpVerify from "./Auth/Pages/OtpVerify.jsx";
import SignIn from "./Auth/Pages/SingIn.jsx";
import SignUp from "./Auth/Pages/SignUp.jsx";
import OrderSuccessful from "./Pages/OrderSuccessfull.jsx";
import Faqs from "./Pages/Faqs.jsx";
import CardPage from "./Pages/CardPage.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import TrackOrderDetails from "./Components/TrackOrder/TrackOrderDetails.jsx";
// import SignInTest from "./Auth/Pages/SignInTest.jsx";
import AddressVerify from "./Auth/Pages/addressVerify.jsx";
import Profile from "./Pages/Profile.jsx";
import UnauthorizedAccessPage from "./Common/AuthuserModal.jsx";
import Protected from "./Components/protected/protectedForComponent.jsx";
import CheckoutAdddress from "./Pickup_Request/Multiple_Address/CheckoutAdddress.jsx";
// import ChangeAddress from "./Pickup_Request/Components/ChangeAdddress.jsx";
import ChangeAdddressPage from "./Pickup_Request/Multiple_Address/ChangeAddressPage.jsx";
import Summary from "./Module/summary/Summary.jsx";
import TermsCondition from "./Auth/Pages/TermsCondition.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< Protected Component={Homepage} />} />
        <Route path="/about" element={<Protected Component={AboutUs} />} />
        <Route path="/contact-us" element={<Protected Component={ContactScreen} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/terms-condition" element={<TermsCondition/>} />
        <Route path="/request_pickup" element={<Protected Component={RequestPickup} />} />
        <Route path="/cart" element={<Protected Component={CardPage} />} />
        <Route path="/pricing" element={<Protected Component={Pricing} />} />
        <Route path="/upload-scrap" element={<UploadScrap />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/Success-page" element={<Protected Component={OrderSuccessful} />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/addressVerify" element={<AddressVerify />} />
        <Route path="/trackOrder" element={<Protected Component={TrackOrder} />} />
        <Route path="/profile" element={<Protected Component={Profile} />} />
        <Route path="/trackOrderDetails" element={<Protected Component={TrackOrderDetails} />} />
        <Route path="/checkoutAddress" element={<Protected Component={CheckoutAdddress} />} />
        <Route path="/unauthorized" element={<UnauthorizedAccessPage />} />
        <Route path="/addAddress" element={<ChangeAdddressPage />} />
        <Route path="/summaryOrder" element={<Summary />}/>
      </Routes>
    </div>
  );
}

export default App;
