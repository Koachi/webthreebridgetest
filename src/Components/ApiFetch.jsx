import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodoForm from "./AddTodoForm";

const ApiFetch = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const apiUrl = "http://49.13.2.10:4000/todos";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]); // Update todos list with the new todo
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then((response) => {
        setTodos(todos.filter(todo => todo.id !== id)); // Update todos list by removing the deleted todo
      })
      .catch((err) => console.log(err));
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || (filterStatus === "completed" && todo.completed) || (filterStatus === "incomplete" && !todo.completed))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Query</h1>
      <div className="flex justify-between mb-4">
        <div>
          <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search Todo" className="border border-gray-400 rounded px-2 py-1 mr-2" />
          <select value={filterStatus} onChange={handleFilterChange} className="border border-gray-400 rounded px-2 py-1">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <AddTodoForm apiUrl={apiUrl} onTodoAdded={handleTodoAdded} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((todo, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">{todo.name}</h2>
            <p className="mb-2">{todo.description}</p>
            <p className="text-sm text-gray-600">Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
            <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-white rounded px-4 py-1 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiFetch;
