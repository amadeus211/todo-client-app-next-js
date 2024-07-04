"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { ConfirmToast } from "react-confirm-toast";
import { useRouter } from "next/navigation";

let width;
export default function Navbar({ logout }) {
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);

  const router = useRouter();

  const handleLogoutClick = () => {
    router.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    width = window.innerWidth;
  }, []);

  return (
    <nav className="flex flex-row items-center justify-between py-6 px-4 bg-zinc-900  ">
      <Link
        href={"/"}
        className="text-white font-bold text-[24px] sm:pl-10 pl-0"
      >
        ToDo App
      </Link>
      <div className="flex flex-row gap-4 items-center">
        {logout && (
          <>
            <p className="text-white font-bold text-[16px] flex flex-row items-center sm:gap-16 gap-5">
              <Link
                href={"/profile"}
                className="text-center flex flex-row items-center gap-2"
              >
                <p className="break-all">
                  {username.length > 8 && width < 800
                    ? `${username.slice(0, 8)}...`
                    : username}
                </p>{" "}
                <FaRegUser />
              </Link>
              <button
                onClick={() => {
                  setShow(true);
                }}
              >
                <MdLogout size={18} />
              </button>
            </p>
          </>
        )}
      </div>
      <ConfirmToast
        asModal={true}
        customFunction={handleLogoutClick}
        setShowConfirmToast={setShow}
        showConfirmToast={show}
        toastText="Are you sure you want to leave?"
        buttonNoText="No"
        buttonYesText="Yes"
      />
    </nav>
  );
}
