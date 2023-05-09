import { useState, useEffect } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { request } from "../api";

const PatientRequestHistory = () => {
  const [history, setHistory] = useState([]);
  const { patientId } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await request.getPatientRequestHistory(patientId);
        setHistory(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, [patientId]);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Table variant="striped" colorScheme="gray">
        <Thead>History</Thead>
        <Tbody>
          {history.map((request) => (
            <Tr key={request.event_type}>{request.event_payload}</Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PatientRequestHistory;
