import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Food from "../../../lib/food.model";

export async function GET(request,content){
  let id = content.params.id;
  console.log(id);
  let success = false;
  await dbConnect();
  const result = await Food.find();
  if(result){
    success = true;
  }

  return NextResponse.json({result,success});
}