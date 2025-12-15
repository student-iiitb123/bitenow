import { log } from "console";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import User from "../../../lib/restuarant.model";

// export async function GET(request){
//     let queryParams =request.nextUrl.searchParams;
//     console.log(queryParams.get('location'));
//     let filter ={};
//     if(queryParams.get("location")){
//         let city = queryParams.get("location");
//         filter ={city:{regex:new RegExp(city,'i')}}
//         //filter.city = queryParams.get('location')
//     }
//     await dbConnect();
//     let result = await User.find(filter);
//     return NextResponse.json({return :true,result})
// }


export async function GET(request) {
    const queryParams = request.nextUrl.searchParams;
    console.log("Location:", queryParams.get('location'));
    console.log("Restuarant:", queryParams.get('restuarant'));

    let filter = {};

    // Filter by city if location is provided
    const city = queryParams.get("location");
    if (city) {
        filter.city = { $regex: city, $options: "i" }; // partial, case-insensitive match
    }

    // Filter by restaurant name if provided
    const restuarant = queryParams.get("restuarant");
    if (restuarant) {
        filter.restuarant = { $regex: restuarant, $options: "i" }; // partial, case-insensitive match
    }

    // Connect to database
    await dbConnect();

    // Fetch users with filter
    let result = await User.find(filter);

    // Return JSON response
    return NextResponse.json({ return: true, result });
}

/*
export async function GET(request){
let queryParams = request.nexturl.searchParams;
let filter= {};
const city = queryparams.get("location")
filter.city = queryParams.get("location")
return Nextresponse.json({return=success})
}
*/