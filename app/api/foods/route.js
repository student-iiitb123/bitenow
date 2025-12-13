import { NextResponse } from "next/server";
import Food from "../../lib/food.model";
import dbConnect from "../../lib/db";


export async function POST(request){
    await dbConnect();
 const payload = await request.json();
 const newfoodItem = new Food(payload);
 result = await newfoodItem.save()
    return NextResponse.json({
    success: true,
    result,
  });
}