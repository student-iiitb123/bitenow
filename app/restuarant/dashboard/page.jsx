import React, { useState } from 'react'
import AddFoodItems from '../../_components/AddFoodItem'

const page = () => {
const [addItem, setAddItem] =useState(false)

  return (
    <div>

      <button onClick={()=>setAddItem(true)}>add Food</button>
      <button onClick={()=>setAddItem(false)}>Dashboard</button>
      {
        addItem ? <AddFoodItems /> : <h1>Restuarant Dashboard</h1>
      }
       </div>
  )
}

export default page