"use client"

import { useState } from "react"


import RestuarantLogin from "../_components/RestuarantLogin.jsx"
import RestuarantSignup from "../_components/RestuarantSignup.jsx"


const Page = () => {
  const [toggle, setToggle] = useState(false)

  
  const handleToggle = () => {
    setToggle((prev) => !prev)  
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-4">
      {toggle ? <RestuarantLogin /> : <RestuarantSignup />}

      <button
        onClick={handleToggle}
        className="text-blue-600 underline mt-3"
      >
        {toggle ? "New user? Create an account" : "Already have an account? Login"}
      </button>
      <br />
    </div>
  )
}

export default Page
