"use client"

import { useState } from "react";

import Layout from "./dashboard/layout";
import RestuarantLogin from "./_components/RestuarantLogin";
import RestuarantSignup from "./_components/RestuarantSignup";

export default function Page() {
  const [toggle, setToggle] = useState(true);

  return (
    <Layout hideSidebar={true}>
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE]">
        <div className="w-full max-w-md px-1">
          {toggle ? <RestuarantLogin /> : <RestuarantSignup />}
          <p className="text-center text-sm text-gray-600 mt-6">
            {toggle ? "New restaurant?" : "Already registered?"}{" "}
            <span
              onClick={() => setToggle(!toggle)}
              className="text-orange-600 font-semibold cursor-pointer hover:underline"
            >
              {toggle ? "Create an account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
