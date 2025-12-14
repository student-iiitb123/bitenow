import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Food from "../../../../lib/food.model";

export async function GET(request, { params }) {
  const { id } = await params;
await dbConnect();
  const result = await Food.findOne({ _id: id });
  const success = result ? true : false;
 return NextResponse.json({ success, result });
}

export async function PUT(request,{params}) {

    const {id} =await params;
    const result = await Food.updateOne({_id:id});
    return NextResponse.json({
    success: true
  });

    
}