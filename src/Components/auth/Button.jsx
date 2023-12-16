/* eslint-disable react/prop-types */
// import React from "react";

import Loader from "./Loader";

const Button = ({
    label, handleClick, classname, style, disabled, loading = false
}) => {
    return (
        <button
            type="button"
            className={classname}
            onClick={handleClick}
            style={style}
            disabled={disabled}
        >
            {!loading ? label : <Loader className="spinner" />}
        </button>
    );
};

export default Button;
