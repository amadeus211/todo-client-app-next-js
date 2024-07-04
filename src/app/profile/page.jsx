import React from "react";
import Navbar from "@/components/Navbar";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function Reset() {
  return (
    <>
      <Navbar logout={true} />
      <div className="flex items-center justify-center h-[80vh] max-w-[20%]  mx-auto">
        <ResetPasswordForm />
      </div>
    </>
  );
}
