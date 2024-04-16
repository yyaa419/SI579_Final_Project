import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import {Text} from "@chakra-ui/react";
import "./TaskList.css";

const TaskList = ({title, tasks }) => {
  const {setNodeRef} = useDroppable({id: title});
  
  return(
    <article flex="3" padding="5" flexDirection="column" minH="10rem" className="column">
    <Text fontWeight="bold" >{title}</Text>

    <SortableContext id={title} items={tasks}>
    <div ref={setNodeRef} className="list">
      {tasks.map((item) => (
        <div>
        <TaskItem uid={item.uid} title={item.name}></TaskItem>
        </div>
      ))}
    </div>
    </SortableContext>
    
  </article>
  );
}

export default TaskList;