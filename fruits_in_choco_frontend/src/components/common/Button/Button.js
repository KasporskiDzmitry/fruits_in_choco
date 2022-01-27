import React, {useRef, useState} from "react";
import style from './Button.module.scss';

export const Button = (props) => {
    const btn = useRef(null);
    const inner = useRef(null);
    const circle = document.createElement("div");
    circle.classList.add(style.inner)

    const onMouseDownHandler = (e) => {
        if (!btn.current.contains(circle)) {
            const bounds = e.target.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            btn.current.appendChild(circle);
            circle.classList.add(style.active)

            circle.style.top = y + "px";
            circle.style.left = x + "px";
        }

    }

    const onMouseUpHandler = (e) => {
        if (btn.current.contains(circle)) {
            btn.current.removeChild(circle);
        }
    }

    return <div className={style.btnWrapper}>
        <button ref={btn} className={style.btnClickEffect} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler}>{props.title}123123123123
            <div ref={inner} className={style.inner}></div>
        </button>
    </div>
};