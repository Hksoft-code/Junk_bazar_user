import CartList from "./CardList";


const CardPage = () => {
    return (
        <div className=" mt-20 lg:mt-32  lg:max-w-[1250px] mx-auto">
            <h2 className="mt-5 text-3xl text-center font-extrabold">Card List</h2>
            <div className="pricing-lists">
                <CartList />
            </div>
        </div>
    );
};

export default CardPage;