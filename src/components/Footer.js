import React, {useRef} from "react";
import Modal from "./Modal";

export default function Footer({ onSearchKeyUp, newTask, onNewTaskChange, onAddTask }) {
    const modal = useRef();

    const openConfirmationModal = () => {
        modal.current.open();
    };

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
                <button onClick={openConfirmationModal}>Ajouter</button>
            </div>
            <Modal  ref={modal} buttonCaption="Oui" onButtonClick={onAddTask}>
                <h2>Confirmer l'ajout</h2>
                <p>Êtes-vous sûr de vouloir ajouter cette tâche ?</p>
            </Modal>
        </>
    );
}
