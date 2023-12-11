import React from "react";
import googleplay from "../assets/PNG/googleplay.png";
import applestore from "../assets/PNG/applestore.png";
import gabbage from "../assets/PNG/gabbabge 1.png";
import { questions } from "../Constants/constants";
import Question from "../Components/Faqs/question";


const Faqs = () => {
    React.useEffect(() => {
        const element = document.getElementById("faq");
        element.scrollIntoView(0, 0);
    }, []);
    return (
        <>
            <div className="faq-container faq-div-1 p-16 mt-14 w-full flex">
                <div className="header p-5 w-[50%] mt-8">
                    <div>
                        <h1 className="font-bold text-[100px]" id="faq">
                            FAQs
                        </h1>
                        <p className="faq-para font-medium text-[32px] text-[#727272] -mt-2">
                            Have questions? We're here to help
                        </p>
                    </div>
                    <div className="faq-stores mt-20 flex">
                        <img
                            src={googleplay}
                            alt=""
                            className="w-[150px] h-[50px] cursor-pointer"
                        />
                        <img
                            src={applestore}
                            alt=""
                            className="w-[150px] h-[50px] ml-4 cursor-pointer"
                        />
                    </div>
                </div>
                <div className="header w-[50%] p-5 pt-0">
                    <img src={gabbage} alt="" className="image w-full h-[450px]" />
                </div>
            </div>
            <div className="faqs-question -mt-20 mb-16 w-full p-[5.25rem]">
                <ul className="list-disc">
                    {questions.map((question, index) => (
                        <Question key={index} question={question} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Faqs;
