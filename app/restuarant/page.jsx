"use client"

import { useState } from "react"
import Login from "../_auth/Login.jsx"
import Signup from "../_auth/Signup.jsx"


const Page = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle((prev) => !prev)  
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-4">
      {toggle ? <Login /> : <Signup />}

      <button
        onClick={handleToggle}
        className="text-blue-600 underline mt-3"
      >
        {toggle ? "New user? Create an account" : "Already have an account? Login"}
      </button>
    </div>
  )
}

export default Page
