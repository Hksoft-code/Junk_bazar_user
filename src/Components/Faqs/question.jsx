/* eslint-disable react/prop-types */
// import React from "react";

const Question = ({ question: { question, answer } }) => {
    return (
        <li className="faq-list mb-10">
            <h1 className="mb-3 uppercase font-normal text-2xl text-[#4A4A4A]">
                {question}
            </h1>
            <p className="font-normal text-2xl text-[#727272]">{answer}</p>
        </li>
    );
};

export default Question;