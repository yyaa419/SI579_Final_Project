import {React, useState, useEffect} from "react";
import TaskBoard from "./Components/TaskBoard";
import { ChakraProvider } from "@chakra-ui/react";
import AddTask from "./Components/AddTask";

function App() {
  const [itemLists, setItemLists] = useState([]);
  
  useEffect(() => {
    const data = localStorage.getItem("itemLists");
    if (data) {
      setItemLists(JSON.parse(data));
    }
 }, []);
  
  return (
    <div className="App">
      <ChakraProvider>
        <AddTask itemLists={itemLists} setItemLists={setItemLists}></AddTask>
        <TaskBoard className="main container" itemLists={itemLists} setItemLists={setItemLists}></TaskBoard>
      </ChakraProvider>
    </div>
  );
}

export default App;
