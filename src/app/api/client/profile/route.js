import jwt from "jsonwebtoken";
import connectMongoDb from "../../../../../libs/mongodb";
import Client from "../../../../../models/client";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
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

    const { _id, username, email, password } = client;
    return NextResponse.json(
      { id: _id, username, email, password },
      { status: 200 }
    );
  } catch (error) {
    console.log(token);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const { newEmail, newUsername, userId } = await request.json();

    await connectMongoDb();

    const client = await Client.findById(userId);
    if (!client) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    client.email = newEmail || client.email;
    client.username = newUsername || client.username;

    await client.save();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token or error updating user" },
      { status: 401 }
    );
  }
}
