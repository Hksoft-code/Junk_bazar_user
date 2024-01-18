import { Link } from "react-router-dom";
import Footer from "../../Common/Footer/Footer";
import Nav from "../../Common/Navbar/Nav";
import Add_Address from "../Components/Add_Address";
import { IoChevronBackOutline } from "react-icons/io5";
import ChangeAddress from "../Components/ChangeAdddress";

const ChangeAdddressPage = () => {
  return (
    <>
      <div>
        <Nav />
        <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
          <Link to="/checkoutAddress">
            <IoChevronBackOutline className="ml-12 w-12 h-12 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200" />
          </Link>
          <h2 className="mt-5 text-3xl text-center text-[#060714] font-['Gilroy-Bold']  font-extrabold">
            Change Address
          </h2>
          <div className="pricing-lists p-2">
            <ChangeAddress />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChangeAdddressPage;
