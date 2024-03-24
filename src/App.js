import React, { useState } from "react";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import arrowUp from "./img/arrow-up.png";
import arrowDown from "./img/arrow-down.png";

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

  function moveTaskUp(index) {
    if (index > 0) {
      const taskIndex = items.findIndex(task => task.id === filteredTasks[index].id);
      const updatedItems = [...items];
      const temp = updatedItems[taskIndex];
      updatedItems[taskIndex] = updatedItems[taskIndex - 1];
      updatedItems[taskIndex - 1] = temp;
      setItems(updatedItems);
    }
  }

  function moveTaskDown(index) {
    if (index < filteredTasks.length - 1) {
      const taskIndex = items.findIndex(task => task.id === filteredTasks[index].id);
      const updatedItems = [...items];
      const temp = updatedItems[taskIndex];
      updatedItems[taskIndex] = updatedItems[taskIndex + 1];
      updatedItems[taskIndex + 1] = temp;
      setItems(updatedItems);
    }
  }

  return (
      <div id="app">
          <Header itemsCount={items.length}
                  itemsDone={items.filter((item) => item.done).length}
                  itemsToDo={items.filter((item) => !item.done).length}/>
          <ol>
              {filteredTasks.map((item, index) => (
                  <li key={index}>
                    <label>
                      <div id="arrows">
                        <button className="arrows" onClick={() => moveTaskUp(index)}><img src={arrowUp} alt="Flèche vers le haut"/></button>
                        <button className="arrows" onClick={() => moveTaskDown(index)}><img src={arrowDown} alt="Flèche vers le bas"/></button>
                      </div>
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
