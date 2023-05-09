import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const AllMedicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch("/api/admin/medicines");
      const data = await response.json();
      setMedicines(data);
    };

    fetchMedicines();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        All Medicines
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Medicine Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {medicines.map((medicine) => (
            <Tr key={medicine.id}>
              <Td>{medicine.name}</Td>
              <Td>{medicine.description}</Td>
              <Td>{medicine.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AllMedicines;
