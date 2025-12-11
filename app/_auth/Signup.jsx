import React from 'react'

const Signup = () => {
  return (
    <>
   <div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
    
    <h1 class="text-3xl font-bold text-center mb-6">Sign Up</h1>

    <form class="space-y-4">

      <input type="text" 
        placeholder="Username" 
        name="username"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

        <input type="text" 
        placeholder="Restuarnt Name" 
        name="restorentname"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

        <input type="email" 
        placeholder="Email" 
        name="email"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />


      <input type="password" 
        placeholder="Password" 
        name="password"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

      <input type="password" 
        placeholder="Confirm Password" 
        name="confirmPassword"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

      <input type="number" 
        placeholder="Mobile Number" 
        name="mobile"
        class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

      

      <button type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
        Submit
      </button>

    </form>
  </div>
</div>

      
    </>
  )
}

export default Signup
