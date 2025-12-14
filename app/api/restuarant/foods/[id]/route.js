import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Food from "../../../../lib/food.model";
import { Types } from "mongoose";


export async function GET(request,{params}){
  const {id} = await params;
  console.log(id);
  let success = false;
  await dbConnect();
  const result = await Food.find({restro_id:id});
  if(result){
    success =true;
  }
  return NextResponse.json({result,success:true})
}



export async function DELETE(request, { params }) {
  await dbConnect();

  const { id } =await params;

  const result = await Food.deleteOne({ _id: id });

  return NextResponse.json({
    success: result.deletedCount > 0,
  });
}



