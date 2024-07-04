"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { userAgent } from "next/server";
import Navbar from "./Navbar";
export default function Authentication() {
  const [registerForm, setRegisterForm] = useState(false);

  // useEffect(() => {
  //   localStorage.removeItem("token");
  // }, []);

  return (
    <div>
      {!registerForm ? (
        <LoginForm setRegisterForm={setRegisterForm} />
      ) : (
        <RegisterForm setRegisterForm={setRegisterForm} />
      )}
    </div>
  );
}
