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
    
   let success = false;
    const {id} =await params;
    const payload = await request.json();
    const result = await Food.findOneAndUpdate({_id:id},payload);
    if(result){
        success= true;
    }
    return NextResponse.json({
   result,success
  });

    
}