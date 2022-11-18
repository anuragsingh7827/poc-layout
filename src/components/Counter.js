import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import styles from '../css/Counter.module.css';
import { nanoid } from "nanoid";

function Counter(props){
    const draggableId = props.widget.id + '/////' + nanoid();
    return (
        <Draggable draggableId={draggableId} index={props.index}>
            {(provided) => (
                <div className={styles.counter} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <h3 className={styles.title}>
                        {props.widget.numberType.toUpperCase()} DEVICES
                    </h3>
                    <h2 className={styles.count}>{props.widget.count}</h2>
                </div>
            )}
        </Draggable>
    )
}

export default Counter;