import Footer from "../../Common/Footer/Footer";
import Nav from "../../Common/Navbar/Nav";
import Add_Address from "../Components/Add_Address";

const CheckoutAdddress = () => {
  return (
    <>
      <div>
        <Nav />
        <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
          <h2 className="mt-5 text-3xl text-center text-[#060714] font-['Gilroy-Bold']  font-extrabold">
          Checkout
          </h2>
          <div className="pricing-lists p-2">
           <Add_Address />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutAdddress;
