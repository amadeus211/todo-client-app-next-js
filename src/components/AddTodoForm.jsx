"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoReturnDownBack } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please, fill all fields");
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (result.ok) {
        router.push("/todo");
        router.refresh();
        toast.success("Todo has been created");
      } else {
        const errorResponse = await result.json();
        console.error("Error response from server:", errorResponse);
        throw new Error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };

  return (
    <div className="flex flex-col  w-full items-center mx-5 ">
      <h2 className="sm:text-[40px] text-[32px] font-bold self-start">
        Create new ToDo
      </h2>
      <form
        className="flex flex-col gap-3 border-8 w-full rounded-3xl py-5 px-10 my-10 border-zinc-900 max-h-64"
        onSubmit={handleSubmit}
      >
        <Toaster position="bottom-center" />
        <input
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          value={title}
          className="border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5"
          type="text"
          placeholder="Title"
        />
        <input
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border-2 rounded-md border-zinc-200 outline-none focus:border-zinc-900 py-2 pl-5"
          type="text"
          placeholder="Description"
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
            className="w-fit border-2 rounded-xl bg-zinc-900 px-10 py-2 shadow-lg text-white hover:bg-zinc-950 transition-all duration-150 ease-in-out"
          >
            {" "}
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
