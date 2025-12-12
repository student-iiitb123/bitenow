import { NextResponse } from "next/server";
import { User} from "../../lib/restuarant.model"
import dbConnect from "../../lib/db";


export async function GET() {
    await dbConnect();
    const data = await User.find();
    console.log(data)
    
    return NextResponse.json({result:true});
}




