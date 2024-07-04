"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm({ setRegisterForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      toast.error("Blank fields are not allowed.");
      return;
    }

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/client/auth`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password, email }),
      });

      if (result.ok) {
        const data = await result.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        toast.success("Logged in successfully!");
        router.push("/todo");
      } else {
        const data = await result.json();
        throw new Error(data.message || "Failed to log in");
      }
    } catch (error) {
      console.log("Error logging in", error);
      toast.error(error.message || "This didn't work.");
      emailInputRef.current.style.borderColor = "red";
      passwordInputRef.current.style.borderColor = "red";
    }
  };

  const handleFocus = (inputRef, secondRef) => {
    if (inputRef.current.style.borderColor === "red") {
      inputRef.current.style.borderColor = "";
      secondRef.current.style.borderColor = "";
    }
  };

  

  return (
    <div className="">
      <form
        className="flex flex-col gap-6 border-8 w-full rounded-3xl py-10 px-10 my-10 border-zinc-900"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <p className="font-bold text-3xl text-zinc-900">Login</p>
          <p className="font-bold text-xl text-zinc-900">Hi, Welcome back!</p>
        </div>

        <input
          value={email}
          className="border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5 text-sm placeholder:text-base"
          type="email"
          placeholder="Email"
          onChange={(e) => {setEmail(e.target.value)}}

          ref={emailInputRef}
          onFocus={() => handleFocus(emailInputRef,  passwordInputRef)}
        />
        <input
          onChange={(e) => {setPassword(e.target.value)}}
          value={password}
          className="border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5"
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
          onFocus={() => handleFocus(passwordInputRef, emailInputRef)}
        />

        <button
          type="submit"
          className="w-fit border-2 rounded-xl bg-zinc-900 px-10 py-2 shadow-lg text-white hover:bg-zinc-950 transition-all duration-150 ease-in-out self-center"
        >
          Login
        </button>

        <div className="flex flex-row gap-1 items-center justify-center">
          <p className=" text-sm">Not registered yet?</p>
          <button
            type="button"
            onClick={() => setRegisterForm(true)}
            className="text-blue-700 hover:border-b-2 border-spacing-y-14 py-1 transition-all duration-100 ease-in-out hover:border-blue-700 text-sm "
          >
            Register now!
          </button>
        </div>

        <div className="absolute bottom-500 left-0 w-full">
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      </form>
    </div>
  );
}
