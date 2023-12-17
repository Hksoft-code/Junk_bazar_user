import Footer from "../Common/Footer/Footer";
import Nav from "../Common/Navbar/Nav";
import TrackOrderList from "../Components/TrackOrder/TrackOrderList";

const TrackOrder = () => {
    return (
        <div>
            <Nav />
            <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
                <h2 className="mt-5 text-3xl text-center font-extrabold">Card List</h2>
                <div className="pricing-lists">
                    <TrackOrderList />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TrackOrder;