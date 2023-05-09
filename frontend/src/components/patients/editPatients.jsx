import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

const EditPatient = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/editPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      toast({
        title: "Patient updated.",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to update patient.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading>Edit Patient</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>

        <FormControl id="newPassword" isRequired>
          <FormLabel>New password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
          />
        </FormControl>

        <Button mt={4} colorScheme="blue" type="submit">
          Update Patient
        </Button>
      </form>
    </Box>
  );
};

export default EditPatient;
