import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  // eslint-disable-next-line react/prop-types
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
