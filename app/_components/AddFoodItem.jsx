import React, { useState } from 'react'

const AddFoodItems = () => {
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [path,setPath]=useState("")
    const [description,setDescription]=useState("")

    const handleAddFoodItem=()=>{
        console.log(name,price,path,description)
    }
  return (
    <div className='container'>
      <h1>Add new food item</h1>
      <div className='input-wrapper'>
        <input type='text' className='input-field' placeholder='enter food name' value={name} onChange={(e)=>setName(e.target.name)}/>
      </div>
      <div className='input-wrapper'>
        <input type='text' className='input-field' placeholder='enter food price' value={price} onChange={(e)=>setPrice(e.target.name)}/>
      </div>
      <div className='input-wrapper'>
        <input type='text' className='input-field' placeholder='enter image path' value={path} onChange={(e)=>setPath(e.target.name)}/>
      </div>
      <div className='input-wrapper'>
        <input type='text' className='input-field' placeholder='enter description' value={description} onChange={(e)=>setDescription(e.target.name)}/>
      </div>
      <div className='input-wrapper'>
        <button className='button' onClick={handleAddFoodItem}> Add Food item</button>
      </div>
    </div>
  )
}

export default AddFoodItems;
