import React, { useState } from "react";
import LargeCell from "./LargeCell";
import SmallCell from "./SmallCell";
import styles from '../css/Cells.module.css';
import { DragDropContext } from '@hello-pangea/dnd';

function Cells(props){
    const [cellsConfig, setCellsConfig] = useState({
        'cell-1': {
            id: 'cell-1',
            widgetIds: []
        },
        'cell-2': {
            id: 'cell-2',
            widgetIds: []
        },
        'cell-3': {
            id: 'cell-3',
            widgetIds: []
        },
    });

    const widgetsData = {
        'Total devices counter': {
            id: 'Total devices counter',
            type: 'counter',
            numberType: 'total',
            count: props.computedData.totalDevices,
            pictographType: '',
            categoryWiseData: {},
            allDevicesData: []
        },
        'Active devices counter': {
            id: 'Active devices counter',
            type: 'counter',
            numberType: 'active',
            count: props.computedData.activeDevices,
            pictographType: '',
            categoryWiseData: {},
            allDevicesData: []
        },
        'Total devices piechart': {
            id: 'Total devices piechart',
            type: 'pictograph',
            numberType: 'total',
            count: 0,
            pictographType: 'piechart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Active devices piechart': {
            id: 'Active devices piechart',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'piechart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Total devices doughnutchart': {
            id: 'Total devices doughnutchart',
            type: 'pictograph',
            numberType: 'total',
            count: 0,
            pictographType: 'doughnutchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Active devices doughnutchart': {
            id: 'Active devices doughnutchart',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'doughnutchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Total devices barchart': {
            id: 'Total devices barchart',
            type: 'pictograph',
            numberType: 'total',
            count: 0,
            pictographType: 'barchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Active devices barchart': {
            id: 'Active devices barchart',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'barchart',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        },
        'Report': {
            id: 'Report',
            type: 'pictograph',
            numberType: 'active',
            count: 0,
            pictographType: 'report',
            categoryWiseData: props.computedData.categoryWiseData,
            allDevicesData: props.computedData.allDevicesData
        }
    }

    function handleOnDrag(result){
        const { destination, source, draggableId } = result;

        const draggedWidgetId = draggableId.split('/////')[0];
        
        if(!destination) return;
        
        else if(destination.droppableId === source.droppableId 
            && destination.index === source.index) return;
        
        else{
            const startColumn = cellsConfig[source.droppableId];
            const finishColumn = cellsConfig[destination.droppableId];

            const newStartColumnWidgetIds = [...startColumn.widgetIds];
            newStartColumnWidgetIds.splice(source.index,1);
   
            if(source.droppableId === destination.droppableId){
              newStartColumnWidgetIds.splice(destination.index,0,draggedWidgetId);
              
              const newStartColumn = {
                ...startColumn,
                widgetIds: newStartColumnWidgetIds
              }

              setCellsConfig(prevCellsConfig => {
                return {
                  ...prevCellsConfig,
                  [newStartColumn.id]: newStartColumn
                }
              });

            }
            else{
              const newFinishColumnWidgetIds = [...finishColumn.widgetIds];
      
              newFinishColumnWidgetIds.splice(destination.index,0,draggedWidgetId);
              
              const newStartColumn = {
                ...startColumn,
                widgetIds: newStartColumnWidgetIds
              }
      
              const newFinishColumn = {
                ...finishColumn,
                widgetIds: newFinishColumnWidgetIds
              }
        
              setCellsConfig(prevCellsConfig => {
                return {
                  ...prevCellsConfig,
                  [newStartColumn.id]: newStartColumn,
                  [newFinishColumn.id]: newFinishColumn
                }
              });
      
            }
        } 
    }

    return (
        <section className={styles.container}>
            <DragDropContext onDragEnd={handleOnDrag}>
                <div className={styles.smallCellsContainer}>
                    <SmallCell  cellId='cell-1' 
                                cellData={cellsConfig['cell-1']} 
                                setCellsConfig={setCellsConfig} 
                                widgetsData={widgetsData}
                    />
                    <SmallCell  cellId='cell-2' 
                                cellData={cellsConfig['cell-2']} 
                                setCellsConfig={setCellsConfig} 
                                widgetsData={widgetsData}
                    />
                </div>
                <div className={styles.largeCellContainer}>
                    <LargeCell  cellId='cell-3' 
                                cellData={cellsConfig['cell-3']} 
                                setCellsConfig={setCellsConfig} 
                                widgetsData={widgetsData}
                    />
                </div>
            </DragDropContext>
        </section>
        
    )
}

export default Cells;