import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
} from "@chakra-ui/react";

const addMedicine = async (medicine) => {
  try {
    const response = await fetch("/api/admin/add_medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicine),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const AddMedicine = () => {
  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const medicine = {
      medicine_name: medicineName,
      category_id: category,
      quantity,
    };
    const result = await addMedicine(medicine);
    setMedicineName("");
    setCategory("");
    setQuantity("");
    history.push(`/medicine/${result.id}`); // push medicine id to params
  };

  return (
    <VStack spacing={4} alignItems="flex-start">
      <form onSubmit={handleSubmit}>
        <FormControl id="medicineName" isRequired>
          <FormLabel>Medicine Name</FormLabel>
          <Input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            placeholder="Enter medicine name"
          />
        </FormControl>
        <FormControl id="category" isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
          ></Select>
        </FormControl>
        <FormControl id="quantity" isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add Medicine
        </Button>
      </form>
    </VStack>
  );
};

export default AddMedicine;
