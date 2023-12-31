import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import Nav from "./Navbar/Nav";

const UnauthorizedAccessPage = () => {
  const history = useNavigate();

  const handleLoginButtonClick = () => {
    // Redirect to the login page
    history("/sign-up");
  };

  const handleUpButtonClick = () => {
    window.history.back();
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            Unauthorized Access
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to access this page.
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
            onClick={handleLoginButtonClick}
          >
            Go to Login
          </button>
          <div className="mt-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={handleUpButtonClick}
            >
              Up
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnauthorizedAccessPage;
