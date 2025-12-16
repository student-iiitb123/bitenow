import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/restuarant.model";

export async function GET(){
    await dbConnect();
    let success = false;
    let result = await User.find();
    // console.log(result
    result = result.map((items) => items.city.charAt(0).toUpperCase()+ items.city.slice(1))
    result = [...new Set(result.map((item) =>item ))]
    if(result){
        success = true;
    }
 
    return NextResponse.json({result,success})
}




