"use client";

import React, { useState, useEffect } from "react";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forms() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Clear the error for the current input field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));

    if (id === "day" || id === "month" || id === "year") {
      // If the change is in day, month, or year dropdowns, update birthday
      setFormData((prevData) => ({
        ...prevData,
        birthday: {
          ...prevData.birthday,
          [id]: value,
        },
      }));
    } else {
      // If the change is in other fields, update as usual
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleFormSubmit = async () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email =
          "Sorry, this email address is not valid. Please try again.";
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    // Check if password and confirmPassword match
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.day || !formData.month || !formData.year) {
      newErrors.birthday = "Birthday is required";
    }

    setErrors(newErrors);
    console.log("OBJECT KEY ERROR", Object.keys(newErrors).length);
    // Check if there are no errors before making the API call
    if (Object.keys(newErrors).length === 1) {
      try {
        // Make a POST request to the addUser route
        const response = await fetch("api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          // Display success toast
          toast.success("User account successfully created", {
            autoClose: 2000,
          });
         
        } else {
          // Display error toast
          toast.error("Failed to add user. Please try again.", {
            autoClose: 2000,
          });
        }

        console.log(data); 
       
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to add user. Please try again.", {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center  h-full bg-white ">
      <ToastContainer />
      <div className="w-full max-w-md px-4 mt-[126px] bg-white h-full mb-30">
        <h1 className="text-2xl text-black font-bold mb-5">
          Create User Account
        </h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className={`h-[50px] border-gray-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.fullName ? "border-red-500" : ""
              }`}
              id="fullName"
              type="text"
              placeholder="Full Name"
              onChange={(e) => handleInputChange(e)}
              style={{
                position: "relative",
              }}
            />

            {errors.fullName && (
              <p className=" text-red-500 text-xs italic">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <div className="flex">
              <span className="inputcontect text-black mt-20">
                Contect Number
              </span>
              <span className=" inputcontectStar inputcontect text-red-500">
                *
              </span>
            </div>

            <input
              className={`h-[50px] border-gray-400 shadow appearance-none border mt-10px rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.contactNumber ? "border-red-500" : ""
              }`}
              id="contactNumber"
              type="text"
              placeholder="Enter your Number"
              onChange={(e) => handleInputChange(e)}
            />

            {errors.contactNumber && (
              <p className=" text-red-500 text-xs italic">
                {errors.contactNumber}
              </p>
            )}
          </div>

          <div className="mb-6 bg-white">
            <label className="block text-gray-700 text-sm font-bold mb-4">
              Birthday
            </label>
            <div className="flex justify-evenly">
              <select
                className="w-[80px] h-[47px] text-[#4D5C6F] mr-2 bg-white shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                id="day"
                onChange={handleInputChange}
                value={formData.birthday.day}
              >
                <option value="">Day</option>
                {/* Add options for days */}
                {Array.from({ length: 31 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              {errors.day && (
                <p className=" text-red-500 text-xs italic">{errors.day}</p>
              )}

              <select
                className="w-[80px] h-[47px] text-[#4D5C6F] mr-2 bg-white shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                id="month"
                onChange={handleInputChange}
                value={formData.birthday.month}
              >
                <option value="">Month</option>
                {/* Add options for months */}
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="w-[80px] h-[47px] text-[#4D5C6F]  mr-2 bg-white shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline border-gray-400"
                id="year"
                onChange={handleInputChange}
                value={formData.birthday.year}
              >
                <option value="">Year</option>
                {/* Add options for years, adjust range based on your needs */}
                {Array.from({ length: 50 }, (_, index) => (
                  <option key={index + 1970} value={index + 1970}>
                    {index + 1970}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-4"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="flex">
              <span className="inputemail text-[#4D5C6F]">
                Email Address
              </span>
              <span className=" inputemailstar  ">
                *
              </span>
            </div>
            <input
              className={`h-[50px] border-gray-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              id="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.email && (
              <p className=" text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-4"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`h-[50px] border-gray-400 shadow appearance-none border rounded w-full py-2 px-3 text-[#4D5C6F] leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="Create Password"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.password && (
              <p className=" text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-4"
            >
              Confirm Password
            </label>
            <input
              className={`h-[50px] border-gray-400 shadow appearance-none border rounded w-full py-2 px-3 text-[#4D5C6F] leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.confirmPassword && (
              <p className=" text-red-500 text-xs italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </form>
        <div className="flex flex-col sm:flex-row  justify-between gap-4 sm:gap-0 sm:w-full pb-11">
        <button
            className="bg-white hover:bg-blue-70 font-bold py-2 px-10 border-2   rounded focus:outline-none focus:shadow-outline border-cyan-700 text-cyan-700"
            type="button"
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        
        </div>
      </div>
    </div>
  );
}
