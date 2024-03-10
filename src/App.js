import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./Pages/Home.jsx";
import AboutUs from "./Pages/AboutPage.jsx";
import Pricing from "./Pages/PriceList.jsx";
import ContactScreen from "./Pages/Contact.jsx";
import RequestPickup from "./Pages/PickupRequest.jsx";
import { Route, Routes } from "react-router-dom";
import UploadScrap from "./Pages/UploadScrap.jsx";
import OtpVerify from "./Auth/Pages/OtpVerify.jsx";
import SignIn from "./Auth/Pages/SingIn.jsx";
import SignUp from "./Auth/Pages/SignUp.jsx";
import OrderSuccessful from "./Pages/OrderSuccessfull.jsx";
import Faqs from "./Pages/Faqs.jsx";
import CardPage from "./Pages/CardPage.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import TrackOrderDetails from "./Components/TrackOrder/TrackOrderDetails.jsx";
import AddressVerify from "./Auth/Pages/addressVerify.jsx";
import Profile from "./Pages/Profile.jsx";
import UnauthorizedAccessPage from "./Common/AuthuserModal.jsx";
import Protected from "./Components/protected/protectedForComponent.jsx";
import CheckoutAdddress from "./Pickup_Request/Multiple_Address/CheckoutAdddress.jsx";
import ChangeAdddressPage from "./Pickup_Request/Multiple_Address/ChangeAddressPage.jsx";
import Summary from "./Module/summary/Summary.jsx";
import TermsCondition from "./Auth/Pages/TermsCondition.jsx";
import axiosInstance from "./api-config/axiosInstance";
import Loader from "./Components/Loader.jsx";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // onMessage(messaging,(payload)=>{
    //   console.log("fcm payload", payload);
    // })
    axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);

        return config;
      },
      (error) => {
        // Handle request error
        setLoading(false);
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        console.log("axios response ", response);
        setLoading(false);
        return response;
      },
      (error) => {
        console.log("axiosInstance response error", error);
        setLoading(false);

        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <div>
      <Loader show={loading} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactScreen />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route
          path="/request_pickup"
          element={<Protected Component={RequestPickup} />}
        />
        <Route path="/cart" element={<Protected Component={CardPage} />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/upload-scrap" element={<UploadScrap />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route
          path="/Success-page"
          element={<Protected Component={OrderSuccessful} />}
        />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/addressVerify" element={<AddressVerify />} />
        <Route
          path="/trackOrder"
          element={<Protected Component={TrackOrder} />}
        />
        <Route path="/profile" element={<Protected Component={Profile} />} />
        <Route
          path="/trackOrderDetails"
          element={<Protected Component={TrackOrderDetails} />}
        />
        <Route
          path="/checkoutAddress"
          element={<Protected Component={CheckoutAdddress} />}
        />
        <Route path="/unauthorized" element={<UnauthorizedAccessPage />} />
        <Route path="/addAddress" element={<ChangeAdddressPage />} />
        <Route path="/summaryOrder" element={<Summary />} />
      </Routes>
    </div>
  );
}

export default App;
