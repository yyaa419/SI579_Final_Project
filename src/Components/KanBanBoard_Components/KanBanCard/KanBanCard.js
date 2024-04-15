import { Flex } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const KanBanCard = ({title,index,parent,}) => {
  //change from useDraggable to useSortable here 
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
  };


  return (
    <Flex
      padding="3"
      backgroundColor="white"
      margin="2"
      borderRadius="8"
      border="2px solid gray.500"
      boxShadow="0px 0px 5px 2px #2121213b"
      transform={style.transform}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
    
      
        <text>
          {title}
        </text>
    
    </Flex>
  );
};

export default KanBanCard;