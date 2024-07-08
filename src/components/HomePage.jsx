import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { verifyToken } from "../../utils/auth";
import Loading from "./Loading";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username);
    if (username) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : isLoggedIn ? (
        <>
          <div className="flex flex-col gap-5 items-center justify-center h-[80vh] p-6">
            <div className="flex flex-col space-y-5 text-center tracking-wide">
              <h2 className="text-3xl font-bold">Hi, {username}</h2>
              <p className="text-xl">Welcome to ToDo app!</p>
            </div>
            <Link
              href={"/todo"}
              className="p-5 border-2 rounded-2xl bg-zinc-800 hover:bg-zinc-800 text-white"
            >
              Go to ToDo&apos;s
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-5 items-center justify-center h-[80vh] p-6">
            <div className="flex flex-col space-y-5 text-center">
              <h2 className="text-3xl font-bold">Hi, welcome to ToDo app!</h2>
              <p className="text-xl">Please login or register your account</p>
            </div>
            <Link
              href={"/authentication"}
              className="p-5 border-2 rounded-2xl bg-blue-400 hover:bg-blue-500 text-white"
            >
              Login now!
            </Link>
          </div>
        </>
      )}
    </>
  );
}
