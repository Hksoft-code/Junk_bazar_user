import Footer from "../../Common/Footer/Footer";
import Nav from "../../Common/Navbar/Nav";
import { IoChevronBackOutline } from "react-icons/io5";
import Summary_component from "./components/Summary_component";
import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <>
      <div>
        <Nav />
        <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
        <Link to="/changeAddress">
            <IoChevronBackOutline className="ml-12 w-12 h-12 cursor-pointer rounded-full border border-gray-300 p-2 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200" />
          </Link>
          <h2 className="mt-5 text-3xl text-center text-[#060714] font-['Gilroy-Bold']  font-extrabold">
            Summary
          </h2>
          <div className="pricing-lists p-2">
            <Summary_component />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Summary;
