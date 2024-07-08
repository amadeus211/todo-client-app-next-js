"use client";

import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { CiSquarePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No token found");
      }

      const result = await fetch(`${process.env.NEXT_PUBLIC_API}/topics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!result.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await result.json();
      setTodos(data.topics);
    } catch (error) {
      console.error("Error fetching todos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchTodos();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" sticky top-[0px] sm:left-16 left-3/4 max-w-[50px] mt-5  ">
            <Link
              href={"/addTodo"}
              className="flex items-center justify-center p-2 text-white bg-zinc-800 border-0 rounded-xl hover:bg-zinc-900 transition-all duration-150 ease-in-out hover:scale-105  z-999"
            >
              <FaPlus size={30} />
            </Link>
          </div>
          <div className="flex flex-wrap items-stretch justify-center gap-6 px-10">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex flex-col justify-between border-2 rounded-xl border-zinc-800 px-5 py-5 mt-6 items-start max-w-sm
                 w-full min-h-[30vh] h-auto shadow-lg hover:scale-105 transition-all ease-in-out duration-150  flex-basis-[30%]"
              >
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-2xl break-all">{todo.title}</h2>
                  <div className="text-lg break-all">
                    {todo.description.length > 150
                      ? `${todo.description.slice(0, 150)}...`
                      : todo.description}
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <RemoveBtn id={todo._id} fetchTodos={fetchTodos} />
                  <Link
                    href={`/editTodo/${todo._id}`}
                    className="flex items-center"
                  >
                    <button className="text-slate-600 hover:text-slate-700">
                      <HiPencilAlt size={24} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
            <Link
              href={"/addTodo"}
              className="flex justify-center border-2 rounded-xl border-zinc-800 px-5 py-5 mt-6 max-w-sm w-full h-[30vh] items-center hover:bg-zinc-300 transition-all duration-150 ease-out flex-grow flex-basis-[30%]"
            >
              <CiSquarePlus size={75} />
            </Link>
          </div>
        </>
      )}
    </>
  );
}
