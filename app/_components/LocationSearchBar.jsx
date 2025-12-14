"use client";

import { useEffect, useState } from "react";


export default function LocationInput({loadResturant}) {
  const [locations, setLocations] = useState([]); // all location
  const [filtered, setFiltered] = useState([]);   // matching location
  const [showDropdown, setShowDropdown] = useState(false); // show hide dropdown
  const [value, setValue] = useState(""); // input value

 
  
  // Load locations from API when component loads you see
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const res = await fetch("/api/restuarant/customers/location");
    const data = await res.json();

    if (data.success) {
      setLocations(data.result);
      setFiltered(data.result);
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);

   
    const matches = locations.filter((city) =>
      city.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(matches);
    setShowDropdown(true);
  };

  const handleSelect = (city) => {
    setValue(city);
    setShowDropdown(false);
    loadResturant({location:city})

  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter your location"
        value={value}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-10 max-h-40 overflow-auto">
          {filtered.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 