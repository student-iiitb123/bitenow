import React from 'react'

const cart = () => {
  return (
    <>
    {/* <!-- Breadcrumb --> */}
<section className="py-10 bg-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-2xl font-semibold">Cart Page</h2>
    <p className="text-sm">Home / Pages / Cart</p>
  </div>
</section>

{/* <!-- Cart --> */}
<section className="py-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

    {/* <!-- Cart Items --> */}
    <div className="lg:col-span-9 border p-4">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product Name</td>
            <td>$10</td>
            <td>1</td>
            <td>$10</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* <!-- Sidebar --> */}
    <div className="lg:col-span-3 space-y-4">
      <div className="border p-4">
        <h4>Coupon</h4>
        <input type="text" className="border w-full" />
        <button className="border w-full mt-2">Apply</button>
      </div>

      <div className="border p-4">
        <h4>Summary</h4>
        <p>Total: $100</p>
      </div>

      <div className="border p-4">
        <h4>Payment</h4>
        <button className="border w-full mt-2">Checkout</button>
      </div>
    </div>

  </div>
</section>

      
    </>
  )
}

export default cart
