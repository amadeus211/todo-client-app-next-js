"use client";

import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { ConfirmToast } from "react-confirm-toast";
export default function RemoveBtn({ id, fetchTodos }) {
  const [show, setShow] = useState(false);

  const router = useRouter();
  const removeTodo = async () => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/topics?id=${id}`, {
      method: "DELETE",
    });

    if (result.ok) {
      router.push("/todo");
      router.refresh();
      fetchTodos();
    }
  };

  const handleClickRemove = () => {
    setShow(true);
  };
  return (
    <>
      <button
        onClick={handleClickRemove}
        className="text-red-400  hover:text-red-500"
      >
        <HiOutlineTrash size={24} />
      </button>
      <ConfirmToast
        asModal={true}
        customFunction={removeTodo}
        setShowConfirmToast={setShow}
        showConfirmToast={show}
        toastText="Are you sure you want to delete this ToDo?"
        buttonNoText="No"
        buttonYesText="Yes"
      />
    </>
  );
}
