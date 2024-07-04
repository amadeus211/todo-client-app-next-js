"use client";

import React from "react";
import Authentication from "@/components/Authentication";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import HomePage from "@/components/HomePage";

export default function MainPage() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          {!token ? (
            <>
              {" "}
              <Navbar logout={false} />
              <div className="flex items-center justify-center h-[80vh] max-w-[20%]  mx-auto">
                <Authentication />
              </div>
            </>
          ) : (
            <>
              <HomePage logined={true} username={username} />
            </>
          )}
        </>
      )}{" "}
    </>
  );
}
