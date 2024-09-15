import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/mongo.config";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("123456", salt);
  await User.create({
    email: "expert@gmail.com",
    password: password,
    name: "Expert",
    role: "Expert",
  });

  return NextResponse.json({
    status: 200,
    message: "Expert created successfully",
  });
}