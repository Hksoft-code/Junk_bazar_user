import icon from "../../assets/SVG/icon.svg";
import icon_1 from "../../assets/SVG/icon-1.svg";
import icon_2 from "../../assets/SVG/icon-2.svg";
import icon_3 from "../../assets/SVG/icon-3.svg";


const About = () => {
  return (
    <main className="max-w-[1200px] mx-auto">
      <div>
        <section className="p-5">
          <h1 className="font-['Gilroy-Regular'] font-bold text-3xl text-center">
            Unlock the Value in your Junk
          </h1>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 p-6">
          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img src={icon} alt="pickup-van" className="w-8 md:w-10 mt-3" />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Scrap Pickup
            </h1>
            <p className="max-w-[200px] mx-auto">
              Book your Pickup Now! We will come to your doorstep on your time
              slot to collect your scrap and deliver your money.
            </p>
          </div>

          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img
                src={icon_1}
                alt="auction-hammer"
                className="w-8 md:w-10 mt-3"
              />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Online Auction
            </h1>
            <p className="max-w-[200px] mx-auto">
              We provide professional pickup services to scrap your materials in
              a safe manner.
            </p>
          </div>

          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img src={icon_2} alt="scrap-icon" className="w-8 md:w-10 mt-3" />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Scrap Buyer
            </h1>
            <p className="max-w-[200px] mx-auto">
              We provide professional pickup services to get your scraps done
              safely.
            </p>
          </div>

          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img
                src={icon_3}
                alt="calculator-icon"
                className="w-8 md:w-10 mt-3"
              />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Scrap Rate Calculaor
            </h1>
            <p className="max-w-[200px] mx-auto">
              Want to know the worth of your scrap before selling it? Use our
              online calculator to calculate how much your scrap is worth.
            </p>
          </div>
        </section>
        
      </div>
    </main>
  );
};

export default About;
