import React from "react";
import TaskBoard from "./Components/TaskBoard";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  
  return (
    <div className="App">
      <ChakraProvider>
        <TaskBoard className="main container"></TaskBoard>
      </ChakraProvider>
    </div>
  );
}

export default App;
