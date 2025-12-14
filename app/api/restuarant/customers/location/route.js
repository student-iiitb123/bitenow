import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/restuarant.model";

export async function GET(){
    await dbConnect();
    let result = await User.find();
    // console.log(result);
    result = result.map((items) => items.city)
    result = [...new Set(result.map((item) =>item ))]
    console.log(result)
    return NextResponse.json({result: true})
}