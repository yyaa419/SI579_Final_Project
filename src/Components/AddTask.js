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
    // this uuid idea is also from the reference, it's used to generate a unique id for each tasks
    // I pick it since I don't want to set name as the identifier since it's very possibile that
    // there are two tasks with the same name
    uid: uuidv4(),
    name: "",
    status: "ToDo",
  });

  // the input judegment is by myself, I want to make sure that the input is not empty
  const [input, setInput] = useState("");
  const [isEmpty, setisEmpty] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  // the handleAddTask function done by myself is used to add the task to the task list, since I have to 
  // make sure that the input is not empty, so I add the isEmpty state to judge whether the input is empty
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

  // the return part is done by myself, I use the chakra-ui to implement the input and radio button
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
        {/* the Radio button is implemented by myself, so that it's convenient for user to choose the task type  */}
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
