import React from "react";
export default function Header({itemsCount, itemsDone, itemsToDo}){
    return (
        <>
            <h2>To Do</h2>
            <h3>Il y'a {itemsCount} tâches au total</h3>
            <span>
              Il y a <b>{itemsDone}</b> tâches <em id="done">achevées</em> et{" "}
                <b>{itemsToDo}</b>{" "}
                <em id="todo">en attente</em>
            </span>
        </>);
}

