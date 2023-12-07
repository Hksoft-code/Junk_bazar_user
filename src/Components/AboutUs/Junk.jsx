// import { useNavigate } from "react-router-dom";
import junk_bg from "../../assets/PNG/junk-bg.png";
import Treasure from "./Treasure";


const Junk = () => {
//   const navigate = useNavigate()
  return (
    <div>
      <main className="lg:pt-10 lg:px-8 flex justify-center items-center">
        <section className="grid grid-cols-1 lg:grid-cols-2 justify-around mx-5 px-1 lg:px-6 md:px-0 lg:mx-14 text-zinc-500">
          <div className="lg:px-10 py-5 order-2 lg:order-1">
            <div className="text-zinc-800 pb-4 text-3xl lg:text-4xl font-['Gilroy-Bold'] leading-tight flex lg:flex-col">
              <h1 className="mr-1">Welcome to</h1>
              <h1> JunkBazar</h1>
            </div>
            <div>
              <p className="lg:max-w-[450px] ">
                At Junk Bazar, we are experts at gathering a variety of metal
                and plastic debris. We can assist you whether you have outdated
                books, magazines, computers, office furniture, old batteries,
                waste iron scrap, aluminum, copper, brass, steel, non-ferrous
                and ferrous scrap metals, old plastics, or outdated office
                equipment. We offer competitive market pricing for your junk
                materials and serve both business and residential customers.
              </p>
            </div>
            <div className="hidden lg:flex justify-center lg:justify-start items-center">
              <button
                // onClick={() => navigate("/faqs")}
                className="hidden text-center text-zinc-500 text-base font-semibold tracking-tight border-2 border-zinc-500 hover:bg-lime-400 hover:text-white hover:border-0 duration-200 lg:flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-4 py-[.45rem]"
              >
                Learn More
              </button>
              <button
                // onClick={() => navigate("/login_signup")}
                className="text-center text-white text-base font-semibold tracking-tight bg-lime-400 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-4 mt-5 cursor-pointer px-4 py-[.65rem]"
              >
                Get Started
              </button>
            </div>
          </div>

          <aside className="order-1 lg:order-2 mt-10 lg:mt-0 hidden lg:flex">
            <section>
              <img src={junk_bg} alt="junk-img" />
            </section>
          </aside>
        </section>
      </main>
      <Treasure />
    </div>
  );
};

export default Junk;
