import { NextResponse } from "next/server";
import connectMongoDb from "../../../../../libs/mongodb";
import Client from "../../../../../models/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { email, username, password } = await request.json();
  await connectMongoDb();

  const existingClient = await Client.findOne({ email });
  if (existingClient) {
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 400 }
    );
  }

  const newClient = new Client({ email, username, password });
  await newClient.save();
  const token =  jwt.sign({ id: newClient._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return NextResponse.json(
    { message: "Client created", token, username },
    { status: 201 }
  );
}