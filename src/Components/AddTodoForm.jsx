import React, { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ apiUrl, onTodoAdded }) => {
  const [newTodo, setNewTodo] = useState({ name: "", description: "", completed: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(apiUrl, newTodo)
      .then((response) => {
        onTodoAdded(response.data.data); 
        setNewTodo({ name: "", description: "", completed: false }); // Reset the form
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input type="text" name="name" value={newTodo.name} onChange={handleInputChange} placeholder="Todo Name" className="border border-gray-400 rounded px-2 py-1 mr-2" />
        <input type="text" name="description" value={newTodo.description} onChange={handleInputChange} placeholder="Todo Description" className="border border-gray-400 rounded px-2 py-1 mr-2" />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-1">Add Todo</button>
      </div>
    </form>
  );
};

export default AddTodoForm;
