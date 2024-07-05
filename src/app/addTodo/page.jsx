"use client";

import React, { useEffect, useState } from "react";
import AddTodoForm from "@/components/AddTodoForm";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
export default function AddTodo() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    setToken(token);
    setUsername(username);
    setLoading(false);
  });
  return (
    <>
      {token ? (
        <>
          <Navbar logout={true} />
          <div className="flex items-center justify-center h-[80vh] max-w-lg m-auto  ">
            <AddTodoForm />
          </div>
        </>
      ) : (
        <>
          <HomePage logined={false} />
        </>
      )}
    </>
  );
}
