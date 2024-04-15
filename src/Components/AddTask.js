import { Flex, Button, Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  VStack,
  Radio,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,

} from "@chakra-ui/react";
import React, { useState } from "react";

export default function AddTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("ToDo");
  const [isEmpty, setisEmpty] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleTaskType = (e) => {
    setType(e.target.value);
  }

  const handleAddCard = () => {
    if (title.trim() === "") {
      setisEmpty(true);
      setIsOpen(true);
      return;
    }
    setisEmpty(false);
    addTask(type,title);
    setTitle("");
  };

  return (
    <Flex w="60%" p="5" alignItems="center">
      <VStack>
        <FormControl>
          <FormLabel>Task Title</FormLabel>
          <Input 
            type="text" 
            onChange={(e) => {
              setTitle(e.target.value);
              setisEmpty(false);}}
            
            value={title} />
        </FormControl>

        {isEmpty && (
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Empty Input
                </AlertDialogHeader>
                <AlertDialogBody>
                  Please enter a task title.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button colorScheme="blue" onClick={onClose}>
                    Close
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}


        <FormControl as="fieldset" onChange={handleTaskType}>
          <FormLabel as="legend">Task Type</FormLabel>
          <RadioGroup defaultValue="ToDo">
            <HStack spacing="24px">
              <Radio value="ToDo">ToDo</Radio>
              <Radio value="InProgress">In Progress</Radio>
              <Radio value="Done">Done</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        
        
        <Button
          colorScheme="blue"
          onClick={() => {
            setTitle("");
            handleAddCard();
          }}
        >
          Add Card
        </Button>
      </VStack>
    </Flex>
  );
}
