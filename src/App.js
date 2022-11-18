import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CellsContainer from "./components/CellsContainer";
import styles from './css/App.module.css';


function App(){
  const [isClicked,setIsClicked] = useState(false);

  return (
    <main className={styles.main}>
        <Sidebar setIsClicked={setIsClicked} isClicked={isClicked} />
        {isClicked && <CellsContainer/>}
    </main>
  )
}

export default App;
