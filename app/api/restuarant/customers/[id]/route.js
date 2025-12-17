import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/restuarant.model";
import Food from "../../../../lib/food.model";

export async function GET(request,{params}){
    const { id } = await params;
    let success = false;
    console.log(id);
    await dbConnect();
    const restuarant = await User.findById(id);

 const food = await Food.find({ restro_id: id });
      
   return NextResponse.json({restuarant,food,success})
}