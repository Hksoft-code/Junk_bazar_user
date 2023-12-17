import { useEffect } from "react";
import Hero from "../Components/Contact/Hero";
import Contactus from "../Components/Contact/contactUs";
import Form from "../Components/Contact/Form";
import Nav from "../Common/Navbar/Nav";
import Footer from "../Common/Footer/Footer";


const ContactScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Nav />
      <Hero />

      <Contactus />

      <Form />
      <Footer />
    </div>
  );
};

export default ContactScreen;