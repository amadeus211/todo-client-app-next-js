"use client";

import React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
export default function RegisterForm({ setRegisterForm }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const loginInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login || !password || !email) {
      alert("blank fields");
      return;
    }
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/client/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password, email, username: login }),
      });

      if (result.ok) {
        router.push("/todo");
        router.refresh();
        const data = await result.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("refreshToken", data.refreshToken);

        toast.success("Register in successfully!");
      } else {
        throw new Error("Failed register");
      }
      // return result.json();
    } catch (error) {
      console.log("Error register", error);
      toast.error("Email already in use");
      emailInputRef.current.style.borderColor = "red";
      passwordInputRef.current.style.borderColor = "red";
      loginInputRef.current.style.borderColor = "red";
    }
  };
  const handleFocus = (inputRef, secondRef, thirdRef) => {
    if (inputRef.current.style.borderColor === "red") {
      inputRef.current.style.borderColor = "";
      secondRef.current.style.borderColor = "";
      thirdRef.current.style.borderColor = "";
    }
  };

  const handleChange = (e, setValue, inputRef) => {
    setValue(e.target.value);
    if (inputRef.current.style.borderColor === "red") {
      inputRef.current.style.borderColor = "rgb(229, 231, 235)";
    }
  };
  return (
    <form
      className="flex flex-col gap-6 border-8 w-full 
     rounded-3xl py-10 px-10 my-10  border-zinc-900 "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <p className="  font-bold text-3xl text-zinc-900 ">Register</p>
        <p className=" font-bold text-xl text-zinc-900 ">Create new account</p>
      </div>{" "}
      <input
        value={email}
        className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5 text-sm placeholder:text-base "
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        ref={emailInputRef}
        onFocus={() =>
          handleFocus(emailInputRef, passwordInputRef, loginInputRef)
        }
      />
      <input
        value={login}
        className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5 text-sm placeholder:text-base "
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setLogin(e.target.value);
        }}
        ref={loginInputRef}
        onFocus={() =>
          handleFocus(emailInputRef, passwordInputRef, loginInputRef)
        }
      />
      <input
        value={password}
        className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5"
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        ref={passwordInputRef}
        onFocus={() =>
          handleFocus(emailInputRef, passwordInputRef, loginInputRef)
        }
      />
      <button
        type="submit"
        className="w-fit border-2  rounded-xl bg-zinc-900
      px-10 py-2 shadow-lg text-white hover:bg-zinc-950
      transition-all duration-150 ease-in-out self-center	  "
      >
        Register
      </button>
      <div className="flex flex-row gap-1 items-center justify-center">
        <p className="text-sm">Registered?</p>
        <button
          type="button"
          onClick={() => {
            setRegisterForm(false);
          }}
        >
          <span className="text-blue-700 hover:border-b-2 border-spacing-y-14 py-1   transition-all duration-100 ease-in-out hover:border-blue-700 text-sm ">
            Login now!
          </span>
        </button>
      </div>
      <div className="absolute bottom-500 left-0 w-full">
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </form>
  );
}
