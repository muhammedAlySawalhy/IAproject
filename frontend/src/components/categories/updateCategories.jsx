import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { updateCategory } from "../api";

const UpdateCategory = ({ category }) => {
  const [newName, setNewName] = useState("");
  const [name, setName] = useState("");
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch("/api/categories/updateCategory", {
        name,
        newName,
      });
      toast({
        title: "Success!",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewName("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl id="newName">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter new name"
            required
          />
          <FormLabel>New Name</FormLabel>
          <Input
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="Enter new name"
            required
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" mt={4}>
          Update Category
        </Button>
      </form>
    </Box>
  );
};

export default UpdateCategory;
