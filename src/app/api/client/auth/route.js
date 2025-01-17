import { NextResponse } from "next/server";
import connectMongoDb from "../../../../../libs/mongodb";
import Client from "../../../../../models/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export async function POST(request) {
  const { email, password } = await request.json();
  await connectMongoDb();

  const client = await Client.findOne({ email });
  if (!client) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, client.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const username = client.username;

  const accessToken = jwt.sign({ id: client._id }, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: client._id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

  console.log(accessToken, refreshToken);

  return NextResponse.json({ accessToken, refreshToken, username }, { status: 200 });
}
