import { v4 as uuidv4 } from "uuid";
import {
  Flex,
  Button,
  Input,
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

export default function AddTask({ itemLists, setItemLists }) {
  const [task, setTask] = useState({
    uid: uuidv4(),
    name: "",
    status: "ToDo",
  });

  const [input, setInput] = useState("");
  const [isEmpty, setisEmpty] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleAddTask = () => {
    if (task.name.trim() === "") {
      setisEmpty(true);
      setIsOpen(true);
      return;
    }
    setisEmpty(false);
    setItemLists((prevItemLists) => {
      const updatedLists = [...prevItemLists, task];
      localStorage.setItem("itemLists", JSON.stringify(updatedLists));
      return updatedLists;
    });
    setTask({ ...task, name: "" });
    setInput("");
  };

  return (
    <Flex w="60%" p="5" alignItems="center">
      <VStack>
        <FormControl>
          <FormLabel>Task Title</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              setTask({ ...task, uid: uuidv4(), name: e.target.value });
              setInput(e.target.value);
            }}
            value={input}
          />
        </FormControl>

        {isEmpty && (
          <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Empty Input
                </AlertDialogHeader>
                <AlertDialogBody>Please enter a task title.</AlertDialogBody>
                <AlertDialogFooter>
                  <Button colorScheme="blue" onClick={onClose}>
                    Close
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}

        <FormControl
          as="fieldset"
          onChange={(e) => {
            setTask({ ...task, uid: uuidv4(), status: e.target.value });
          }}
        >
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
            handleAddTask();
          }}
        >
          Add Card
        </Button>
      </VStack>
    </Flex>
  );
}
