import { useState, useEffect } from "react";
import PostData from "./04-post-data";
const url = "http://192.168.1.229:4000/";

const deleteData = async (id) => {
  const res = await fetch(`http://192.168.1.229:4000/todos/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const updatedTodos = await res.json();
    setTodos(updatedTodos); // Update UI instantly
  }
};

const FetchData = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(url);
      const todos = await res.json();
      console.log(todos);
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  return (
    <>
      <h2>Todo App</h2>
      <PostData setTodos={setTodos} />
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded group"
        >
          <span>{todo.title}</span>

          <button
            onClick={() => deleteData(todo.id)}
            className="text-red-500 hover:text-red-700 font-bold px-2 cursor-pointer transition-colors"
            title="Delete Todo"
          >
            ✕
          </button>
        </div>
      ))}
    </>
  );
};
export default FetchData;
