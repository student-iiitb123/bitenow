import React from 'react'

const Login = () => {
  return (
    <>
    <div className='h-[350px]'>
      <div className="text-center my-4 ">
        <h1 className="text-2xl font-semibold">Login Page</h1>
      </div>

      <form className="flex flex-col gap-3 items-center w-full">
        <input
          type="text"
          placeholder="Enter email"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-72 h-10 px-3 border border-gray-400 rounded-md focus:outline-none"
        />

        <button
          className="mt-3 w-32 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      </div>
    </>
  );
};

export default Login;
