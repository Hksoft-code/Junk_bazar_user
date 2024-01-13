import junk_bazar from "../../assets/PNG/junk bazar logo2 1.png";
import google from "../../assets/SVG/Google play.svg";
import apple from "../../assets/SVG/Apple store.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-lime-400 py-2 md:p-1 mt-10 text-white font-['Gilroy-Medium']">
      <div className="p-0 md:p-2 lg:px-10 ">
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 lg:pb-10 p-2">
          <section className="">
            <div className="">
              <img
                src={junk_bazar}
                alt="junzbazar-logo"
                className="w-40 my-5"
              />
              {/* <div className="hidden md:flex flex-row">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Newsletter"
                  className="py-2 rounded-tl-full rounded-bl-full bg-white text-black px-3"
                />
                <button
                  onClick={() => { }}
                  className="bg-lime-500 rounded-tr-full rounded-br-full py-[0.6rem] px-2 text-sm text-white"
                >
                  Subscribe
                </button>
              </div> */}
            </div>
          </section>
          <section>
            <div className="mt-10 lg:mt-0">
              <h1 className="lg:text-center font-bold tracking-widest">
                Quicklinks
              </h1>
              <ul className="underline lg:flex flex-col justify-center items-center leading-loose">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact US</Link>
                </li>
                <li className="cursor-pointer">Price List</li>
              </ul>
            </div>
          </section>
          <section>
            <div className="mt-5 lg:mt-0">
              <h1 className="font-bold tracking-widest">Company</h1>
              <ul className="underline leading-loose">
                <li>
                  <Link to="/support">Support</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms and Conditions</Link>
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mt-5 lg:mt-0">
              <h1 className="font-bold tracking-widest">Reach Us</h1>
              <ul className="underline leading-loose">
                <li>
                  <a href="tel:+913496933405">+91 97097 09248</a>
                </li>
                <li>
                  <a href="mailto:info@junkBazar.com">info@junkBazar.com</a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/place/12+Dariyapur+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kankarbagh Main Rd, Kumhar Toli, Ghrounda, Patna, Bihar 800020
                  </a>
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
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <img src={google} alt="google-img" className="w-36" />
            </a>
            {/* <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer">
              <img src={apple} alt="apple-img" className="w-36 ml-3" />
            </a> */}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
