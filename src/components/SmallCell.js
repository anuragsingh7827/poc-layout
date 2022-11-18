import React, { useState } from "react";
import Counter from "./Counter";
import Pictograph from "./Pictograph";
import styles from '../css/SmallCell.module.css';
import config from '../imgs/config.png';
import SearchPopUp from "./SearchPopUp";
import { Droppable } from "@hello-pangea/dnd";
import { nanoid } from 'nanoid';

function SmallCell(props){
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const widgets = props.cellData.widgetIds.map((widgetId,index) => {
        const widget = props.widgetsData[widgetId];

        if(widget.type === 'counter'){
            return <Counter key={nanoid()} widget={widget} index={index} />
        }else{
            return <Pictograph key={nanoid()} widget={widget} index={index}/>
        }
    })

    return (
        <Droppable droppableId={props.cellId}>
            {(provided) => (
                <div className={styles.smallCell} ref={provided.innerRef} {...provided.droppableProps}>
                    <button onClick={() => setIsPopUpOpen(true)} 
                            className={isPopUpOpen ? `${styles.configBtn} ${styles.configBtnClicked}` : styles.configBtn}>
                            <img className={isPopUpOpen ? `${styles.configIcon} ${styles.configIconClicked}` : styles.configIcon} 
                                src={config} 
                                alt="configIcon"/>
                    </button>
                    <SearchPopUp isPopUpOpen={isPopUpOpen} 
                                cellId={props.cellId} 
                                setCellsConfig={props.setCellsConfig} 
                                setIsPopUpOpen={setIsPopUpOpen}
                                isMulti/>
                    {widgets}
                    {provided.placeholder}
                </div>
            )}
            
        </Droppable>
    )
}


export default SmallCell;