import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../todo";
import "../CSS/TodoForm.css"

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false); // State for popup message

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodo(newTodoText);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    } else {
      setShowPopup(true); // Display popup message if no task is entered
    }
  };

  return (
    <div className="inputForm">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a Task"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      {/* Popup message */}
      {showPopup && (
        <div className="popup">
          <p>Error! Please Enter a Task..</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TodoForm;