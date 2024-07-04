import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";

export default function HomePage({ logined, username }) {
  return (
    <>
      {logined ? (
        <>
          <Navbar logout={true} />

          <div className="flex flex-col gap-5 items-center justify-center h-[80vh] p-6">
            <div className="flex flex-col space-y-5 text-center tracking-wide	">
              <h2 className="text-3xl font-bold ">Hi, {username} </h2>
              <p className="text-xl 	">welcome to ToDo app!</p>
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
          <Navbar logout={false} />

          <div className="flex flex-col gap-5 items-center justify-center h-[80vh] p-6">
            <div className="flex flex-col space-y-5 text-center">
              <h2 className="text-3xl font-bold">Hi, welcome to ToDo app!</h2>
              <p className="text-xl">Please login or register your account</p>
            </div>
            <Link
              href={"/"}
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
