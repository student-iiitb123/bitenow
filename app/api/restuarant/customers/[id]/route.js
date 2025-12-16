import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/restuarant.model";
import Food from "../../../../lib/food.model";

export async function GET(request,{params}){
    const { id } = await params;
    let success = false;
    console.log(id);
    await dbConnect();
    const restuarant = await User.findOne({_id:id});
    const food= await Food.findOne({
restro_id:id})
      
   return NextResponse.json({restuarant,food,success})
}