import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/restuarant.model";
import Food from "../../../../lib/food.model";

export async function GET(request,{params}){
    const { id } = await params;
    let success = false;
    console.log(id);
    await dbConnect();
<<<<<<< HEAD
    const restuarant = await User.findOne({_id:id});
    const food= await Food.find({
restro_id:id})
=======
    const restuarant = await User.findById(id);

 const food = await Food.find({ restro_id: id });
>>>>>>> 85c60063cff4d2b878cb36267c194ad576268945
      
   return NextResponse.json({restuarant,food,success})
}