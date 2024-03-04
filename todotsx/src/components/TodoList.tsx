import React, { useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../todo";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";
import { FaEdit, FaCheck } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  // Functions for handle the actions of edits

  //handle edit start
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };
  //handle edit cancel
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };
  //handle edit save
  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setEditingTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            {editingTodoId === todo.id ? (
              <div className="editText">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button className="cancelBtn" onClick={handleEditCancel}>
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;