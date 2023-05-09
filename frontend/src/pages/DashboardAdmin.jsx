import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";

const SideView = () => {
  return (
    <Box bg="gray.100" h="100vh" w="250px" p="4" boxShadow="xl">
      <VStack spacing="4" align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          Dashboard
        </Text>
        <Divider />
        <Text fontSize="lg" fontWeight="bold">
          Patients
        </Text>
        <VStack spacing="2" align="stretch">
          <ChakraLink as={Link} to="/admin/patients" fontSize="md">
            Patients
          </ChakraLink>
        </VStack>
        <Divider />
        <Text fontSize="lg" fontWeight="bold">
          Categories
        </Text>
        <VStack spacing="2" align="stretch">
          <ChakraLink as={Link} to="/admin/categories" fontSize="md">
            Categories
          </ChakraLink>
        </VStack>
        <Divider />
        <Text fontSize="lg" fontWeight="bold">
          Medicines
        </Text>
        <VStack spacing="2" align="stretch">
          <ChakraLink as={Link} to="/admin/medicines/add" fontSize="md">
            Medicines
          </ChakraLink>
        </VStack>
      </VStack>
    </Box>
  );
};

const DashboardAdmin = () => {
  return (
    <Box display="flex" h="100vh">
      <SideView />
      {/* Other components go here */}
    </Box>
  );
};
