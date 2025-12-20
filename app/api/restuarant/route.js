import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import User from "../../lib/restuarant.model";
import cloudinary from "../../lib/cloudinary";

export async function POST(req) {
  await dbConnect();

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

  let imagePath = null;

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "bitenow" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    imagePath = uploadResult.secure_url;
  }

  let result;

  if (login === "true") {
    result = await User.findOne({ email, password });
    if (!result) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } else {
    const newUser = new User({
      name,
      restuarant,
      city,
      address,
      phone,
      email,
      password,
      image: imagePath,
    });

    result = await newUser.save();
  }

  return NextResponse.json({ success: true, result });
}
