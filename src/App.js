import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Learn JavaScript", done: false },
    { id: 2, text: "Learn React", done: false },
    { id: 3, text: "Play around in CodeSandBox", done: true },
    { id: 4, text: "Build something awesome", done: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  function addTask() {
    if (newTask.trim() !== "") {
      setItems([
        { id: items.length + 1, text: newTask, done: false },
        ...items,
      ]);
      setNewTask("");
    }
  }

  function handleCheckboxClicked(taskId) {
    const updatedItems = items.map((item) => {
      if (item.id === taskId) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function handleDelete(taskId) {
    if (window.confirm("Voulez-vous vraiment supprimer la tâche ?")) {
      const updatedItems = items.filter((item) => item.id !== taskId);
      setItems(updatedItems);
    }
  }

  function searchTask(event) {
    setSearchTerm(event.target.value);
  }

  const filteredTasks = items.filter((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div id="app">
          <Header itemsCount={items.length}
                  itemsDone={items.filter((item) => item.done).length}
                  itemsToDo={items.filter((item) => !item.done).length}/>
          <ol>
              {filteredTasks.map((item, index) => (
                  <li key={index}>
                      <label>
                          <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => handleCheckboxClicked(item.id)}
                          />
                          <span className={item.done ? "done" : ""}>{item.text}</span>
                          <button className="delete" onClick={() => handleDelete(item.id)}>
                              Supprimer
                          </button>
                      </label>
                  </li>
              ))}
          </ol>
          <div>
          </div>
          <Footer onSearchKeyUp={searchTask}
                  newTask={newTask}
                  onAddTask={addTask}
                  onNewTaskChange={(e) => setNewTask(e.target.value)}/>
      </div>
  );
}
