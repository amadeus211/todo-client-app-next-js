"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { IoReturnDownBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ResetPasswordForm() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const router = useRouter();

  const passwordInputRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/client/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!result.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await result.json();
      setUserData(data);
      setEmail(data.email);
      setUsername(data.username);
    } catch (error) {
      console.error("Error fetching todos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isMatch = await bcrypt.compare(password, userData.password);
    if (isMatch) {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API}/client/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newEmail: email,
            newUsername: username,
            userId: userData.id,
          }),
        });

        if (!result.ok) {
          throw new Error("Failed to update user data");
        } else {
          router.push("/todo");
          localStorage.setItem("username", username);
        }

        toast.success("Updated successfully");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Password incorrect");
      passwordInputRef.current.style.borderColor = "red";
    }
  };


  const handleChangePasswordInput = () =>{
    if(passwordInputRef.current.style.borderColor = "red"){
      passwordInputRef.current.style.borderColor = "";
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : userData ? (
        <div>
          <form
            className="flex flex-col gap-6 border-8 w-full 
   rounded-3xl py-10 px-10 my-10  border-zinc-900 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col gap-2">
              <p className="  font-bold text-3xl text-zinc-900  ">
                Your profile data
              </p>
              <p className=" font-bold text-xl text-blue-500">Update data</p>
            </div>{" "}
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                Email
                <input
                  value={email}
                  className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5 text-sm placeholder:text-[14px] "
                  type="email"
                  placeholder="New email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label className="flex flex-col gap-1">
                Username
                <input
                  value={username}
                  className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5 text-sm placeholder:text-[14px] "
                  type="text"
                  placeholder="New username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </label>
              <label className="flex flex-col gap-1">
                Password
                <input
                  value={password}
                  className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5 placeholder:text-[14px]"
                  type="password"
                  placeholder="Enter your password for update"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleChangePasswordInput();
                  }}
                  ref={passwordInputRef}
                />
              </label>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <button
                type="button"
                className="w-fit border-2  rounded-xl bg-orange-300
      sm:px-10 px-5 py-2 shadow-lg  hover:bg-orange-400
      transition-all duration-150 ease-in-out text-black "
                onClick={() => {
                  router.push("/todo");
                }}
              >
                <IoReturnDownBack size={24} />
              </button>{" "}
              <button
                type="submit"
                className="w-fit border-2  rounded-xl bg-blue-400
    px-10 py-2 shadow-lg text-white hover:bg-blue-500
    transition-all duration-150 ease-in-out self-center	  "
              >
                Update
              </button>
            </div>
            <div className="absolute bottom-500 left-0 w-full">
              <Toaster position="bottom-center" reverseOrder={false} />
            </div>
          </form>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}
