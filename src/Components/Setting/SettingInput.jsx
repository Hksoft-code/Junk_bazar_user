
import React from "react";
import Input from "../auth/Input";


const SettingsInput = ({ value, label, handleChange, name, type }) => {
    return (
        <span className="flex flex-col w-1/3 mr-4">
            <label className="text-[16px] text-[#343434 mb-1">{label}</label>
            <Input
                type={type}
                name={name}
                value={value}
                classname="text-[#707070] text-[18px] pl-3 rounded-[8px] h-[48px] outline-none shadow-sm w-full"
                handleChange={handleChange}
            />
        </span>
    );
};

export default SettingsInput;