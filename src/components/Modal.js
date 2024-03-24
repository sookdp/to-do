import React from "react";
import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(function Modal({ children, buttonCaption, onButtonClick }, ref) {
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
    }));

    const handleButtonClick = () => {
        if (typeof onButtonClick === "function") {
            onButtonClick();
        }
    };

    return createPortal(
        <dialog ref={dialog} id="dialog">
            {children}
            <form method="dialog" id="form">
                <button onClick={handleButtonClick}>{buttonCaption}</button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    );
});

export default Modal;