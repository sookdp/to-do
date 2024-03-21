import React from "react";

export default function Footer({ onSearchKeyUp, newTask, onNewTaskChange, onAddTask }) {
    return (
        <>
            <input
                id="searchbar"
                onKeyUp={onSearchKeyUp}
                type="text"
                name="search"
                placeholder="Search Task.."
            />
            <h4>Nouvelle Tâche</h4>
            <div className="new-task">
                <label>
                    <input
                        type="text"
                        value={newTask}
                        onChange={onNewTaskChange}
                    />
                </label>
                <button onClick={onAddTask}>Ajouter</button>
            </div>
        </>
    );
}
