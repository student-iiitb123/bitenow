"use client";

import { useEffect, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function LocationInput({ loadResturant }) {
  const [locations, setLocations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/restuarant/customers/location");
      const data = await res.json();
      if (data.success) {
        setLocations(data.result || []);
        setFiltered(data.result || []);
      }
    } catch (err) {
      console.error("Fetch locations error:", err);
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

    if (text === "") {
      loadResturant();
    }
  };

  const handleSelect = (city) => {
    setValue(city);
    setShowDropdown(false);
    loadResturant({ location: city });
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter city (e.g. Mumbai)"
          value={value}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          className="w-full outline-none bg-transparent text-[#1E2923] placeholder-[#84948A] text-sm font-medium"
        />
        <ChevronDown size={16} className="text-[#84948A] shrink-0" />
      </div>

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2ECE5] rounded-2xl shadow-xl z-30 max-h-48 overflow-y-auto py-2">
          {filtered.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-2.5 cursor-pointer hover:bg-[#E6EFEA] text-sm text-[#1E2923] flex items-center gap-2 transition-colors"
            >
              <MapPin size={14} className="text-[#244C3A]" />
              <span>{city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}