"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { IoReturnDownBack } from "react-icons/io5";

export default function EditTodoForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!result.ok) {
        throw new Error("Failed to update todo");

      } else {
        router.push("/todo");
        toast.success("ToDo updated successfully")

        router.refresh();
      }
      return result.json();
    } catch (error) {
      console.log("Error update todo", error);
      toast.error("Cannot update ToDo")
    }
  };

  return (
    <div className="flex flex-col  w-full items-center mx-5 ">
      <h2 className="sm:text-[40px] text-[32px] font-bold self-start">
        Update ToDo
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border-8 w-full rounded-3xl py-5 px-10 my-10 border-zinc-900 max-h-64"
      >
        <Toaster position="bottom-center" />

        <input
          id="newTitle"
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
          value={newTitle}
          className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5"
          type="text"
          placeholder="New Title"
        />
        <input
        id="newDescription"
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
          value={newDescription}
          className=" border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5"
          type="text"
          placeholder="New Description"
        />
        <div className="flex flex-row justify-between">
          <button
            type="button"
            className="w-fit border-2  rounded-xl bg-orange-300
      sm:px-10 px-5 py-2 shadow-lg  hover:bg-orange-400
      transition-all duration-150 ease-in-out text-black "
            onClick={() => {
              router.push("/todo");
            }}
          >
            <IoReturnDownBack size={24} />
          </button>
          <button
            type="submit"
            className="w-fit border-2  rounded-xl bg-zinc-900
      px-10 py-2 shadow-lg text-white hover:bg-zinc-950
      transition-all duration-150 ease-in-out  "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
