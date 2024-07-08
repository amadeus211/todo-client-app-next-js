"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Authentication({ onLoginSuccess }) {
  const [registerForm, setRegisterForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div>
      {!registerForm ? (
        <LoginForm setRegisterForm={setRegisterForm} onLoginSuccess={onLoginSuccess} />
      ) : (
        <RegisterForm setRegisterForm={setRegisterForm} onLoginSuccess={onLoginSuccess}/>
      )}
    </div>
  );
}
