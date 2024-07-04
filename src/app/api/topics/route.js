import { NextResponse } from "next/server";
import connectMongoDb from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { title, description } = await request.json();
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const { id: userId } = jwt.verify(token, JWT_SECRET);
    console.log(userId);
    await connectMongoDb();
    await Topic.create({ title, description, userId });
    return NextResponse.json({ message: "Todo created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function GET(request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: userId } = jwt.verify(token, JWT_SECRET);
    await connectMongoDb();
    const topics = await Topic.find({ userId });
    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "No ID provided" }, { status: 400 });
  }

  await connectMongoDb();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}
