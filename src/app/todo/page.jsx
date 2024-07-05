"use client";

import TodoList from "@/components/TodoList";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import HomePage from "@/components/HomePage";

export default function Home() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");
    setToken(storedToken);
    setUsername(storedUsername);
    setLoading(false); 
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {username && token ? (
            <div className="max-w-full mx-auto mb-10">
              <Navbar logout={true} />
              <TodoList />
            </div>
          ) : (
            <HomePage logined={false} />
          )}
        </>
      )}
    </>
  );
}
