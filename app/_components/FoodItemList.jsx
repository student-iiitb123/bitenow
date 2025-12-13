const FoodItemList = () => {

    
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
         Food Items
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                S.No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Price (₹)
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Image
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                Operations
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-sm text-gray-700">1</td>
              <td className="px-4 py-3 text-sm font-medium text-gray-800">
                Pizza
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">300</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                Best seller pizza
              </td>
              <td className="px-4 py-3">
                <img
                  src="https://www.healthkart.com/connect/wp-content/uploads/2023/01/900x500_banner_HK-Types-of-foods-that-you-should-eat-a-lot-rarely-and-occasionally.png"
                  alt="Pizza"
                  className="w-12 h-12 rounded-lg object-cover border"
                />
              </td>
              <td className="px-4 py-3 text-center space-x-2">
                <button className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                  Delete
                </button>
                <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
