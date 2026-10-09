"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Store,
  MapPin,
  Phone,
  Mail,
  Lock,
  UserPlus,
  Upload,
  AlertCircle
} from "lucide-react";

const RestuarantSignup = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [restuarant, setRestuarant] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("restuarant", restuarant);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/restuarant", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        if (data.token) {
          localStorage.setItem("restaurantToken", data.token);
        }
        localStorage.setItem("resturantUser", JSON.stringify(data.result));
        router.push("/restuarant/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Restaurant signup error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-[#1E2923]">
          Register Restaurant
        </h1>
        <p className="text-xs text-[#57685D] mt-1">
          Partner with BiteNow and reach thousands of customers
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input icon={User} placeholder="Owner Full Name" value={name} setValue={setName} disabled={loading} />
        <Input icon={Store} placeholder="Restaurant Name" value={restuarant} setValue={setRestuarant} disabled={loading} />
        <Input icon={MapPin} placeholder="City (e.g. Mumbai)" value={city} setValue={setCity} disabled={loading} />
        <Input icon={MapPin} placeholder="Full Address" value={address} setValue={setAddress} disabled={loading} />
        <Input icon={Phone} type="tel" placeholder="Contact Phone Number" value={phone} setValue={setPhone} disabled={loading} />
        <Input icon={Mail} type="email" placeholder="Business Email" value={email} setValue={setEmail} disabled={loading} />
        <Input icon={Lock} type="password" placeholder="Password (min 6 chars)" value={password} setValue={setPassword} disabled={loading} />

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#57685D] uppercase">Restaurant Banner Image</label>
          <div className="flex items-center gap-3 h-11 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A]">
            <Upload size={16} className="text-[#84948A]" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="flex-1 text-xs text-[#57685D] file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#244C3A] file:text-white hover:file:bg-[#1A382B]"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-4 bg-[#244C3A] hover:bg-[#1A382B] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
        >
          <UserPlus size={18} />
          <span>{loading ? "Creating Partner Account..." : "Create Account"}</span>
        </button>
      </form>
    </div>
  );
};

const Input = ({ icon: Icon, type = "text", placeholder, value, setValue, disabled }) => (
  <div className="flex items-center gap-3 h-11 px-4 rounded-xl bg-[#F7F5EF] border border-[#E2ECE5] focus-within:border-[#244C3A] transition-colors">
    <Icon size={16} className="text-[#84948A]" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="flex-1 bg-transparent outline-none text-sm font-medium text-[#1E2923] placeholder-[#84948A]"
      required
      disabled={disabled}
    />
  </div>
);

export default RestuarantSignup;
