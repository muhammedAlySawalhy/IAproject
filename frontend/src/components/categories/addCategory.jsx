import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import * as z from "zod";
import axios from "axios";

const schema = z.object({
  name: z.string().nonempty(),
});

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      schema.parse({ name });
      const res = await axios.post("/api/categories/createCategory", { name });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={error}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Button type="submit">Add Category</Button>
      </VStack>
    </form>
  );
};

export default AddCategory;
