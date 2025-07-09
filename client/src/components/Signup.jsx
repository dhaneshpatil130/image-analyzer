import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { handleError } from "./utils";

const SignupForm = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", signupInfo);
    const { name, email, password } = signupInfo;
  
    if (!name || !email || !password) {
      return handleError("Something is missing in the fields");
    }
  
    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        // Clear form fields
        setsignupInfo({ name: "", email: "", password: "" });
  
        // Navigate to login page
        navigate("/login");
      } else {
        handleError(result.message || "Signup failed");
      }
    } catch (err) {
      handleError(err.message || "Something went wrong");
    }
  };

  const handleLoginRedirect = () => {
    // Navigate to the login page
    navigate("/login");
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-xy">
      <style>
        {`
          @keyframes gradient-xy {
            0% { background-position: 0% 0%; }
            25% { background-position: 50% 50%; }
            50% { background-position: 100% 0%; }
            75% { background-position: 50% 100%; }
            100% { background-position: 0% 0%; }
          }

          .animate-gradient-xy {
            background-size: 300% 300%;
            animation: gradient-xy 6s ease infinite;
          }
        `}
      </style>
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg backdrop-blur-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            autoFocus
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          onClick={handleSignup}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleLoginRedirect}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Already a User? Log In
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
