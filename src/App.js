import React, {useEffect, useState} from "react";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import arrowUp from "./img/arrow-up.png";
import arrowDown from "./img/arrow-down.png";

export default function App() {
  const [items, setItems] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setItems(JSON.parse(savedTasks));
    } else {
      // Initialiser avec des tâches par défaut si aucune tâche n'est trouvée dans le localStorage
      setItems([
        { id: 1, title: "1.Idée", isChecked: true },
        { id: 2, title: "2.Marché", isChecked: true },
        { id: 3, title: "3.Wireframe", isChecked: true },
        { id: 4, title: "4.Design", isChecked: true },
        { id: 5, title: "5.Landingpage", isChecked: true },
        { id: 6, title: "6.Développement", isChecked: false },
        { id: 7, title: "7.Publish", isChecked: false },
        { id: 8, title: "8.Pub", isChecked: false },
        { id: 9, title: "9.Feedback", isChecked: false },
      ]);
    }
  }, []);

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskId = items.length + 1;
      const newTaskWithTitle = `${newTaskId}.${newTask}`;
      setItems([...items,
        { id: newTaskId, title: newTaskWithTitle, done: false },
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
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <span className={item.done ? "done" : ""}>{item.title}</span>
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
