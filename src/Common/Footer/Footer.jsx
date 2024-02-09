import junk_logo from "../../assets/PNG/junk bazar logo 1.png";

import google from "../../assets/SVG/Google play.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-lime-400 py-2 md:p-1 mt-10 text-white font-['Gilroy-Medium']">
      <div className="p-0 md:p-2 lg:px-10 ">
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 lg:pb-10 p-2">
          <section className="">
            <div className="">
              <img
                src={junk_logo}
                alt="junzbazar-logo"
                className="w-40 my-5"
              />
            </div>
          </section>
          <section>
            <div className="mt-10 lg:mt-0">
              <h1 className="lg:text-center font-bold tracking-widest">
                Quicklinks
              </h1>
              <ul className="no-underline lg:flex flex-col justify-center items-center leading-loose">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact US</Link>
                </li>
                <Link to="/pricing">Price List</Link>
              </ul>
            </div>
          </section>
          <section>
            <div className="mt-5 lg:mt-0">
              <h1 className="font-bold tracking-widest">Company</h1>
              <ul className="no-underline leading-loose">
                <li>
                  <Link to="#">Support</Link>
                </li>
                <li>
                  <Link to="/terms-condition">Terms and Conditions</Link>
                </li>
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mt-5 lg:mt-0">
              <h1 className="font-bold tracking-widest">Reach Us</h1>
              <ul className="no-underline leading-loose">
                <li>
                  <Link  to="tel:+91 97097 09248">+91 97097 09248</Link>
                </li>
                <li>
                  <Link  to="mailto:info@junkBazar.com">info@junkBazar.com</Link>
                </li>
                <li>
                  <Link 
                    to="https://maps.app.goo.gl/reA58BrXWAxRkBaH7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kankarbagh Main Rd, Kumhar Toli, Ghrounda, Patna, Bihar 800020
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <div className="md:hidden my-10 mb-10 flex flex-row">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="py-2 rounded-tl-full bg-white text-black rounded-bl-full px-3 border border-gray-300 shadow-sm"
            />
            <button
              onClick={() => { }}
              className="rounded-tr-full rounded-br-full py-[0.6rem] px-2 text-sm text-black"
            >
              Subscribe
            </button>
          </div>
        </div>
        <hr
          style={{
            backgroundColor: "#fff",
            border: "none",
            color: "#fff",
            height: "1px",
          }}
        />

        <div className="flex flex-col md:flex-row pb-1 justify-around items-center mt-3">
          <p className=" text-xl mt-4 text-white pb-5">
            &copy;2023 JunkBazar. All rights reserved. Powered by Kjxsoftech
          </p>
          <div className="flex justify-between items-center">
            <Link to="https://play.google.com/store/apps/details?id=com.junkbazar.com" target="_blank" rel="noopener noreferrer">
              <img src={google} alt="google-img" className="w-36" />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
