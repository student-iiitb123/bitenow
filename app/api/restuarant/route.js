import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import Restaurant from "../../lib/restuarant.model";
import cloudinary from "../../lib/cloudinary";
import { generateToken } from "../../lib/auth";

export async function POST(req) {
  try {
    await dbConnect();

    // Determine content type to handle both JSON (login) and FormData (signup)
    const contentType = req.headers.get("content-type") || "";

    // === LOGIN (JSON or FormData) ===
    if (contentType.includes("application/json")) {
      // Login via JSON
      const body = await req.json();
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Email and password are required" },
          { status: 400 }
        );
      }

      const restaurant = await Restaurant.findOne({
        email: email.toLowerCase().trim(),
      }).select("+password");

      if (!restaurant) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      const isValidPassword = await restaurant.comparePassword(password);
      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = generateToken({
        id: restaurant._id.toString(),
        email: restaurant.email,
        role: "restaurant",
      });

      return NextResponse.json({
        success: true,
        token,
        result: restaurant.toJSON(),
      });
    }

    // === SIGNUP or LOGIN via FormData ===
    const formData = await req.formData();

    const login = formData.get("login");
    const name = formData.get("name");
    const restuarant = formData.get("restuarant");
    const city = formData.get("city");
    const address = formData.get("address");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const password = formData.get("password");
    const imageFile = formData.get("image");

    // FormData login
    if (login === "true") {
      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Email and password are required" },
          { status: 400 }
        );
      }

      const restaurant = await Restaurant.findOne({
        email: email.toLowerCase().trim(),
      }).select("+password");

      if (!restaurant) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      const isValidPassword = await restaurant.comparePassword(password);
      if (!isValidPassword) {
        return NextResponse.json(
          { success: false, message: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = generateToken({
        id: restaurant._id.toString(),
        email: restaurant.email,
        role: "restaurant",
      });

      return NextResponse.json({
        success: true,
        token,
        result: restaurant.toJSON(),
      });
    }

    // === SIGNUP ===
    if (!name || !restuarant || !city || !address || !phone || !email || !password) {
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

    // Check for existing restaurant with same email
    const existing = await Restaurant.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Upload image to Cloudinary if provided
    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        // Validate file size (max 5MB)
        if (buffer.length > 5 * 1024 * 1024) {
          return NextResponse.json(
            { success: false, message: "Image must be less than 5MB" },
            { status: 400 }
          );
        }

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "bitenow",
                allowed_formats: ["jpg", "jpeg", "png", "webp"],
                transformation: [{ width: 800, height: 600, crop: "limit" }],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        });

        imagePath = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError.message);
        return NextResponse.json(
          { success: false, message: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    // Create restaurant (password hashed by pre-save hook)
    const newRestaurant = new Restaurant({
      name,
      restuarant,
      city,
      address,
      phone,
      email,
      password,
      image: imagePath,
    });

    const savedRestaurant = await newRestaurant.save();

    const token = generateToken({
      id: savedRestaurant._id.toString(),
      email: savedRestaurant.email,
      role: "restaurant",
    });

    return NextResponse.json(
      {
        success: true,
        token,
        result: savedRestaurant.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Restaurant API error:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(", ") },
        { status: 400 }
      );
    }

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