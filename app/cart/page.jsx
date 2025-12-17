import React from "react";
import {
  ShoppingCart,
  Trash2,
  Tag,
  CreditCard,
} from "lucide-react";

const Cart = () => {
  return (
    <>
      {/* Breadcrumb */}
      <section className="py-12 bg-[#E8E2D8]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#2F3E34] flex items-center justify-center gap-2">
            <ShoppingCart className="w-7 h-7 text-[#6F8F73]" />
            Cart Page
          </h2>
          <p className="text-sm text-[#7A857C] mt-2">
            Home / Pages / Cart
          </p>
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-14 bg-[#F4F1EC]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-9 bg-[#E8E2D8]/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#6F8F73]/30 text-[#2F3E34]">
                  <th className="py-3">Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-[#6F8F73]/20 text-[#2F3E34]">
                  <td className="py-4 font-medium">Product Name</td>
                  <td>$10</td>
                  <td>1</td>
                  <td className="font-semibold">$10</td>
                  <td>
                    <button className="text-red-500 hover:text-red-600 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">

            {/* Coupon */}
            <div className="bg-[#E8E2D8]/80 backdrop-blur-md rounded-2xl shadow-lg p-5">
              <h4 className="flex items-center gap-2 font-semibold text-[#2F3E34] mb-3">
                <Tag className="w-5 h-5 text-[#6F8F73]" />
                Coupon
              </h4>

              <input
                type="text"
                placeholder="Enter coupon code"
                className="w-full px-4 py-2 rounded-lg bg-[#F4F1EC] text-[#2F3E34] placeholder-[#7A857C] focus:outline-none focus:ring-2 focus:ring-[#6F8F73]"
              />

              <button className="w-full mt-3 py-2 rounded-lg bg-[#6F8F73] text-white hover:bg-[#5d7d64] transition">
                Apply Coupon
              </button>
            </div>

            {/* Summary */}
            <div className="bg-[#E8E2D8]/80 backdrop-blur-md rounded-2xl shadow-lg p-5">
              <h4 className="font-semibold text-[#2F3E34] mb-2">
                Order Summary
              </h4>
              <p className="text-[#7A857C]">
                Total:
                <span className="float-right font-semibold text-[#2F3E34]">
                  $100
                </span>
              </p>
            </div>

            {/* Payment */}
            <div className="bg-[#E8E2D8]/80 backdrop-blur-md rounded-2xl shadow-lg p-5">
              <h4 className="flex items-center gap-2 font-semibold text-[#2F3E34] mb-3">
                <CreditCard className="w-5 h-5 text-[#6F8F73]" />
                Payment
              </h4>

              <button className="w-full py-3 rounded-xl bg-[#6F8F73] text-white font-medium hover:bg-[#5d7d64] transition">
                Proceed to Checkout
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
