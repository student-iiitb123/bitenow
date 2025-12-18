import { NextResponse } from "next/server";
import User from "../../lib/user.model";
import dbConnect from "../../lib/db";

export async function POST(request) {
  await dbConnect();

  const payload = await request.json();

  // LOGIN
  if (payload.login) {
    const { email, password } = payload;

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }

  // SIGNUP
  const newUser = new User(payload);
  const result = await newUser.save();

  return NextResponse.json({
    success: true,
    result,
  });
}
