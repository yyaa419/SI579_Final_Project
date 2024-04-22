import {React,  useState, useEffect } from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { Flex } from "@chakra-ui/react";
import TaskList from "./TaskList";

const TaskBoard = ({itemLists, setItemLists}) => {

  // the idea of dividing whole task lists into three columns is from the reference, so that I could render
  // the whole tasks more easily and clearly 
  const [ToDo, setToDo] = useState ([])
  const [InProgress, setInProgress] = useState([])
  const [Done, setDone] = useState([])

  //should use the useEffect function here so that taskboards could show the right page layout
  useEffect(() => {
    if (itemLists) {
      setToDo(itemLists.filter((item) => item.status === "ToDo"));
      setInProgress(itemLists.filter((item) => item.status === "InProgress"));
      setDone(itemLists.filter((item) => item.status === "Done"));
    }
  }, [itemLists]);


  // the most basic remove task function, which is used to remove the task from the task list
  const handleRemoveTask = (uid) => {
    const updatedLists = itemLists.filter((item) => item.uid !== uid);
    setItemLists(updatedLists);
    localStorage.setItem("itemLists", JSON.stringify(updatedLists));
    };

  
    // the common addItemtoList function, which is to modify the status of the task
    // I use the function this way is to meet the data strcuture of the task list
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



  // the Task List part is don't by myself, clearly show that there is three task columns in total
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
