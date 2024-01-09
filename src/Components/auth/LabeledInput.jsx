/* eslint-disable react/prop-types */
// import React from "react";
import Input from "./Input.jsx";

const LabeledInput = ({
  label,
  handleChange,
  className,
  name,
  type,
  value,
}) => {
  console.log("style", className);
  return (
    <>
      {label ?? (
        <label className="text-[16px] font-[400] text-[#666666]">{label}</label>
      )}
      <Input
        className={className}
        name={name}
        type={type}
        value={value}
        handleChange={handleChange}
        inputmode="numeric" // Set inputmode to "numeric"
      />
    </>
  );
};

export default LabeledInput;
