import User from "../models/user";
import { connectDb } from "@/app/db/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await connectDb();
      const reqBody = await req.json();
      const {
        fullName,
        contactNumber,
        email,
        password,
        birthday,
      } = reqBody.formData;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Convert birthday to a Date object
      const formattedBirthday = new Date(
        `${birthday.year}-${birthday.month}-${birthday.day}`
      );

      // Create a new user instance and save it to the database
      const newUser = await User.create({
        fullName,
        contactNumber,
        email,
        password: hashedPassword,
        birthday: formattedBirthday,
      });

      if (!newUser) {
        return NextResponse.json({
          message: "Error creating user",
          success: false,
        });
      }

      return NextResponse.json(
        { message: "success", newUser },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error adding user:", error);
     return NextResponse.status(500).json({ error: "Internal Server Error" });
    }
  }
};
