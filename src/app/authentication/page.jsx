"use client";

import React from "react";
import Authentication from "@/components/Authentication";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import HomePage from "@/components/HomePage";

export default function AuthPage() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    setToken(token);
    setUsername(username);
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="flex items-center justify-center h-[80vh] max-w-[20%]  mx-auto">
            <Authentication />
          </div>
        </>
      )}{" "}
    </>
  );
}
