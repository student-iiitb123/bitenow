import React from "react";

const Signup = () => {
  return (
    <>
      <div className="text-center my-4">
        <h1 className="text-2xl font-semibold">Signup Page</h1>
      </div>

      <form className="flex flex-col gap-3 items-center w-full">

        <input
          type="text"
          placeholder="Username"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="text"
          placeholder="Restaurant Name"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="number"
          placeholder="Mobile Number"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <button
          className="mt-3 w-32 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
