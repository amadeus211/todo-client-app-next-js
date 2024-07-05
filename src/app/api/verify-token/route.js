import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connectMongoDb from "../../../../libs/mongodb";
import Client from "../../../../models/client";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    await connectMongoDb();
    const client = await Client.findById(userId);

    if (!client) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { username } = client;
    return NextResponse.json({ username }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
