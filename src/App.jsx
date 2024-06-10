import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApiFetch from "./Components/ApiFetch";
import AddTodoForm from "./Components/AddTodoForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiFetch />} />
        <Route path="/AddTodo" element={<AddTodoForm />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
