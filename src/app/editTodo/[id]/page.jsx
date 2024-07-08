import React from "react";
import EditTodoForm from "@/components/EditTodoForm";
import Navbar from "@/components/Navbar";

const getTodoById = async (id) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API}/topics/${id}`, {
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error("Failed fetch todo");
    }
    return result.json();
  } catch (error) {
    console.log("Error", error);
  }
};

export default async function EditTodo({ params }) {
  const { id } = params;
  const { topic } = await getTodoById(id);
  const { title, description } = topic;
  return (
    <>
      <div className="flex items-center justify-center h-[80vh] max-w-lg m-auto  ">
        <EditTodoForm id={id} title={title} description={description} />
      </div>
    </>
  );
}
