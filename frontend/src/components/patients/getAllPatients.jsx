import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const GetAllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box>
      <Heading size="lg" mb={4}>
        All Patients
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.map((patient) => (
            <Tr key={patient.email}>
              <Td>{patient.username}</Td>
              <Td>{patient.email}</Td>
              <Td>
                <Button colorScheme="red" variant="solid">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GetAllPatients;
