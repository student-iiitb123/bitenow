import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import User from "../../lib/user.model";
import { generateToken } from "../../lib/auth";

export async function POST(request) {
  try {
    await dbConnect();
    const payload = await request.json();

    // === LOGIN ===
    if (payload.login) {
      const { email, password } = payload;

      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Email and password are required" },
          { status: 400 }
        );
      }

      const user = await User.findOne({ email: email.toLowerCase().trim() });

      if (!user) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      // Use bcrypt compare for hashed passwords
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      // Generate JWT token
      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: "customer",
      });

      // Return user without password (toJSON handles this)
      return NextResponse.json({
        success: true,
        token,
        user: user.toJSON(),
      });
    }

    // === SIGNUP ===
    const { name, email, password, city, address, mobile } = payload;

    // Validate required fields
    if (!name || !email || !password || !city || !address || !mobile) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Create user (password hashed by pre-save hook)
    const newUser = new User({ name, email, password, city, address, mobile });
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken({
      id: savedUser._id.toString(),
      email: savedUser.email,
      role: "customer",
    });

    return NextResponse.json(
      {
        success: true,
        token,
        result: savedUser.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User API error:", error.message);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
