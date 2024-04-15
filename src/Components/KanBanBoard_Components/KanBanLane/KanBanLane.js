// KanbanLane.tsx
import { Center, Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import KanBanCard from "../KanBanCard/KanBanCard";

const  KanBanLane=({ title, items }) =>{
  const { setNodeRef } = useDroppable({
    id: title,
  });


  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="10rem">
      <Center>
      <Text fontWeight="bold">{title}</Text>
      <Text>task number:{items.length}</Text>

      </Center>
      <Flex
        ref={setNodeRef}
        bg="gray"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        {items.map(({ title: cardTitle }, key) => (
          <KanBanCard title={cardTitle} key={key} index={key} parent={title} />
        ))}
      </Flex>
    </Flex>
  );
}

export default KanBanLane;