/* eslint-disable react/prop-types */
// import React from "react";

const Input = ({
    type,
    name,
    className,
    handleChange,
    value,
    placeHolder,
    style,
    checked,
    id,
  }) => {
    console.log("name from", type);
    return (
      <>
        {/* <input
              type={type}
              name={name}
              value={value}
              className={className}
              onChange={handleChange}
              placeholder={placeHolder}
              style={style}
              checked={checked}
              id={id}
          /> */}
  
        {type == "checkbox" ? (
          <label class="checkboxparentdiv">
            <input
            type="checkbox"
            name={name}
            value={value}
            className={className}
            onChange={handleChange}
            placeholder={placeHolder}
            style={style}
            checked={checked}
            id={id}
          />
            {type == "checkbox" && <span class="checkboxspan"></span>}
          </label>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            className={className}
            onChange={handleChange}
            placeholder={placeHolder}
            style={style}
            checked={checked}
            id={id}
          />
        )}
      </>
    );
  };
  
  export default Input;
  