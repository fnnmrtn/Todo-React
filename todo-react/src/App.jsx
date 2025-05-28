import { useState } from "react";
import { useEffect } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles/App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("DARK_MODE");
    return savedTheme === "true";
  });

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("DARK_MODE", isDarkMode);
    // Add/remove dark class to body
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(newItem) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode} className="btn btn-theme">
          {isDarkMode ? "☀️" : "🌙"} {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
