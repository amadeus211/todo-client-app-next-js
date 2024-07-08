"use client";

import { useEffect, useState } from "react";
import { verifyToken } from "../../utils/auth";
import Navbar from "@/components/Navbar";
import Loading from "./Loading";
import Authentication from "./Authentication";
import { set } from "mongoose";
import HomePage from "./HomePage";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const data = await verifyToken();
        setIsLoggedIn(true);
        setUsername(data.username);
      } catch (error) {
        setIsLoggedIn(false);
        setUsername("");
        setError("Session expired. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setError(null);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
    setError("Session expired. Please log in again.");
  };

  if (error) {
    return (
      <>
        {" "}
        <Navbar logout={false}></Navbar>
        <div className="flex items-center justify-center h-[80vh] max-w-[20%]  mx-auto">
          <Authentication onLoginSuccess={handleLoginSuccess} />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar logout={isLoggedIn} handleLogoutSuccess={handleLogoutSuccess} />
      <div>{children}</div>
    </>
  );
}
