import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Home';
import AboutUs from './Pages/AboutPage';
import Pricing from './Pages/PriceList';
import Nav from './Common/Navbar/Nav';
import Footer from './Common/Footer/Footer';
import ContactScreen from './Pages/Contact';
import RequestPickup from './Pages/PickupRequest';
import Customer from './Auth/Pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import Contactus from './Components/Contact/contactUs';
import CartList from './Pages/CardList';
import UploadScrap from './Pages/UploadScrap';
import OtpVerify from './Auth/Pages/OtpVerify';
import SignIn from './Auth/Pages/SingIn';
import SignUp from './Auth/Pages/SignUp';


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
