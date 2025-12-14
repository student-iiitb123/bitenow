import { NextResponse } from "next/server";
import  User from "../../lib/restuarant.model"
import dbConnect from "../../lib/db";


export async function POST(request) {
  const payload = await request.json();
  let result;

  await dbConnect();

  if (payload.login) {
    // LOGIN
    result = await User.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (!result) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } else {
    // SIGNUP
    const newSeller = new User(payload);
    result = await newSeller.save();
  }

  return NextResponse.json({
    success: true,
    result,
  });
}
