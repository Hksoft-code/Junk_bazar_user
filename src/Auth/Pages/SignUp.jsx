import axios from "axios";
import { useCallback } from "react";
import customer from '../../assets/PNG/customer.png'

const Customer = () => {
    const onButtonsContainerClick = useCallback(() => {
        // Please sync "Homepage" to the project
    }, []);

    var jsonData1 = {

        "name": "alan",
        "age": 23,
        "username": "aturing"

    }

    const fetchQuotes = async () => {
        const article = {
            "dialCode": "+91",
            "phoneNumber": "7488325096"
        };
        const headers = {

            'platform': 'web'
        };
        axios.post('https://junk-j1e6.onrender.com/api/v1/users/register', article, { headers })
            .then((response) => {
                console.log(response)
            });
    };

    return (
        <div class="bg-white py-24 sm:py-32">
            <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
                <div class="w-full text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                    <img class="h-full w-full rounded-full" src={customer} alt=" " />
                </div>
                <div class="w-full">
                    <div className="shadow-md p-8">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome To JunkBazar</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-600">Sign up to enjoy exclusive access!.</p>
                        <p class="mt-6 text-lg leading-8 text-gray-600">Enter Phone Number.</p>

                        <p class="mt-6 text-sm leading-8 text-gray-600">Phone number</p>
                        <input name="myInput" />


                        <div className="flex flex-row items-start justify-start py-2 pr-2 pl-0 gap-[8px]">
                            <img
                                className="relative w-6 h-6 overflow-hidden shrink-0"
                                alt=""
                                src="/check-box.svg"
                            />
                            <div className="relative">
                                <span className="text-darkslategray-200">{`By creating an account, I agree to our `}</span>
                                <span className="[text-decoration:underline]">Terms of use</span>
                                <span className="text-dimgray-200">{` `}</span>
                                <span className="text-darkslategray-200">and</span>
                                <span className="text-dimgray-200">{` `}</span>
                                <span className="[text-decoration:underline]">
                                    <span>Privacy Policy</span>
                                    <span className="text-dimgray-200">{` `}</span>
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <span className="text-darkslategray-200">
                                Already have an account?
                            </span>
                            <span className="text-dimgray-200">{` `}</span>
                            <span className="[text-decoration:underline]">{`Log in  `}</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Customer;
