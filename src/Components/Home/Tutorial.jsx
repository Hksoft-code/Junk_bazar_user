import money from "../../assets/SVG/money.svg";
import door_step from "../../assets/SVG/door_step.svg";
import car_pickup from "../../assets/SVG/car_pickup.svg";

const Tutorial = () => {
  return (
    <main className="max-w-[1200px] mx-auto mt-5 lg:mt-10  ">
      <div>
        <section className="p-5">
          <h1 className="font-['Gilroy-Bold'] font-bold text-3xl text-center">
            How it Works
          </h1>
        </section>

        <section className="grid md:grid-cols-3 p-6">
          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img
                src={car_pickup}
                alt="pickup-van"
                className="w-8 md:w-10 mt-3"
              />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Book a Pickup
            </h1>
            <p className="max-w-[200px] mx-auto">
              Download APP or Webpage and book your pickup in 4 simple steps
            </p>
          </div>

          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img
                src={door_step}
                alt="door-icon"
                className="w-8 md:w-10 mt-3"
              />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Scrap hero at your doorstep
            </h1>
            <p className="max-w-[200px] mx-auto">
              Executive will reach at your doorstep on date & time designated by
              you.
            </p>
          </div>

          <div className="p-2 text-center text-zinc-500 text-sm rounded-lg border-2 shadow-md shadow-gray-300 mx-4 mt-4  lg:mt-0">
            <div className="flex justify-center items-center">
              <img src={money} alt="money-icon" className="w-8 md:w-10 mt-3" />
            </div>
            <h1 className="text-center font-semibold text-base text-black p-1">
              Get paid
            </h1>
            <p className="max-w-[200px] mx-auto">
              Get paid with multiple payment options.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Tutorial;
