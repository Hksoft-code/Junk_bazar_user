import { useEffect } from "react";
import Hero from "../Components/Contact/Hero";
import Contactus from "../Components/Contact/contactUs";
import Form from "../Components/Contact/Form";


const ContactScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Hero />

      <Contactus />

      <Form />
    </div>
  );
};

export default ContactScreen;