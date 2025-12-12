import { NextResponse } from "next/server";
import  User from "../../lib/restuarant.model"
import dbConnect from "../../lib/db";


export async function GET() {
    await dbConnect();
    const data = await User.find();
    console.log(data);
    return NextResponse.json({result:true});
}


export async function POST(request) {
  try {
    const payload = await request.json();

    await dbConnect();

    const newSeller = new User(payload);
    const result = await newSeller.save();

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

