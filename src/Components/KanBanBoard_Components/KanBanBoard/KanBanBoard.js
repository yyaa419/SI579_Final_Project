import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanBanLane from "../KanBanLane/KanBanLane";

import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import AddCard from "../AddCard";

export default function KanBanBoard() {
  const [todoItems, setTodoItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [uItems, setuItems] = useState([]);
  const addNewCard = (title, type) => {
    if (type === "ToDo") {
      setTodoItems([...todoItems, { title }]);
    } else if (type === "Done") {
      setDoneItems([...doneItems, { title }]);
    } else if (type === "InProgress") {
      setInProgressItems([...inProgressItems, { title }]);
    } else if (type === "Unassigned") {
      setuItems([...uItems, { title }]);
    }
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        const container = e.over?.id;
        const title = e.active.data.current?.title ?? "";
        const index = e.active.data.current?.index ?? 0;
        const parent = e.active.data.current?.parent ?? "ToDo";

        if (container === "ToDo") {
          setTodoItems([...todoItems, { title }]);
        } else if (container === "Done") {
          setDoneItems([...doneItems, { title }]);
        } else if (container === "Unassigned") {
          setuItems([...uItems, { title }]);
        } else {
          setInProgressItems([...inProgressItems, { title }]);
        }
        if (parent === "ToDo") {
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1),
          ]);
        } else if (parent === "Done") {
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1),
          ]);
        } else if (parent === "Unassigned") {
          setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
        } else {
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1),
          ]);
        }
      }}
    >
      <Flex flexDirection="column">
        <AddCard addCard={addNewCard} />
        <Flex flex="3">
          <KanBanLane title="ToDo" items={todoItems} />
          <KanBanLane title="In Progress" items={inProgressItems} />
          <KanBanLane title="Done" items={doneItems} />
          <KanBanLane title="Unassigned" items={uItems} />
        </Flex>
      </Flex>
    </DndContext>
  );
}
