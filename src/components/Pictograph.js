import React from "react";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import Doughnutchart from "./Doughnutchart";
import Report from "./Report";
import styles from '../css/Pictograph.module.css';
import { Draggable } from "@hello-pangea/dnd";
import { nanoid } from "nanoid";

function Pictograph(props){
    const labels = [];
    const data = [];
    const backgroundColor = [];

    for(let category in props.widget.categoryWiseData){
        labels.push(category);
        if(props.widget.numberType === 'total'){
            data.push(props.widget.categoryWiseData[category].totalDevices);
        }else if(props.widget.numberType === 'active'){
            data.push(props.widget.categoryWiseData[category].activeDevices);
        }
        backgroundColor.push(props.widget.categoryWiseData[category].color);
    }

    let chart = null;
    if(props.widget.pictographType === 'piechart'){
        chart = <Piechart   labels={labels}
                            data={data}
                            backgroundColor={backgroundColor} 
                    />
    }
    else if(props.widget.pictographType === 'barchart'){
        chart = <Barchart   labels={labels}
                            data={data}
                            backgroundColor={backgroundColor}
                    />
    }
    else if(props.widget.pictographType === 'doughnutchart'){
        chart = <Doughnutchart labels={labels}
                            data={data}
                            backgroundColor={backgroundColor} 
                    />
    }
    else if(props.widget.pictographType === 'report'){
        chart = <Report allDevicesData={props.widget.allDevicesData}/>
    }

    const draggableId = props.widget.id + '/////' + nanoid();
    return (
        <Draggable draggableId={draggableId} index={props.index}>
            {(provided) => (
                <div className={styles.pictograph} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className={styles.badge}></div>
                    <div>
                        {chart}
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Pictograph;