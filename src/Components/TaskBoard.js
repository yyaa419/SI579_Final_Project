import {React,  useState, useEffect } from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";
import TaskList from "./TaskList";

const TaskBoard = ({itemLists, setItemLists}) => {

  const [ToDo, setToDo] = useState ([])
  const [InProgress, setInProgress] = useState([])
  const [Done, setDone] = useState([])

  useEffect(() => {
    if (itemLists) {
      setToDo(itemLists.filter((item) => item.status === "ToDo"));
      setInProgress(itemLists.filter((item) => item.status === "InProgress"));
      setDone(itemLists.filter((item) => item.status === "Done"));
    }
  }, [itemLists]);

  const handleRemoveTask = (uid) => {
    const updatedLists = itemLists.filter((item) => item.uid !== uid);
    setItemLists(updatedLists);
    localStorage.setItem("itemLists", JSON.stringify(updatedLists));
    };

  
  const addItemtoList = (id, status) => {

    setItemLists((prevItemLists) => {
      const updatedLists = prevItemLists.map((item) => {
        if (item.uid === id) {
          return { ...item, status: status };
        }
        return item;
      });
      localStorage.setItem("itemLists", JSON.stringify(updatedLists));
      return updatedLists;
    }
    );
  }


  return (
      <DndProvider backend={HTML5Backend}>
      <Flex flex="3">
        <TaskList title="ToDo" itemLists={ToDo} addItemtoList={addItemtoList} handleRemoveTask={handleRemoveTask}></TaskList>
        <TaskList title="InProgress" itemLists={InProgress} addItemtoList={addItemtoList} handleRemoveTask={handleRemoveTask}></TaskList>
        <TaskList title="Done" itemLists={Done} addItemtoList={addItemtoList} handleRemoveTask={handleRemoveTask}></TaskList>
      </Flex>
     </DndProvider>
    
  );
};

export default TaskBoard;
