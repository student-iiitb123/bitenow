import React, { useEffect, useState } from "react";

const ResturantListing = () => {
  const [restuarant, setResturant] = useState([]);

  useEffect(() => {
    loadRestuarant();
  }, []);

  const loadRestuarant = async (params) => {
    let url = "http://localhost:3000/api/restuarant/customers";
    if(params?.location){
  url = url + "?location=" + params.location;

    }
    else if(params?.restuarant){

    }
    const res = await fetch(url);
    const data = await res.json();

    if (data.return) {
      setResturant(data.result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Popular Restaurants
      </h2>

      {restuarant.length === 0 && (
        <p className="text-gray-500 text-center">
          No restaurants found
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restuarant.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                Restaurant Image
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.restuarant}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                📍 {item.city}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                 {item.email}
                </span>

                <span className="text-gray-600">
                  25–30 min
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResturantListing;
