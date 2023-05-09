import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function DeleteMedicine({ patient, onDeleteMedicine }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [medicineName, setMedicineName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/admin/delete_medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: medicineName, patient: patient }),
    });
    const data = await response.json();
    onDeleteMedicine(data);
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={onOpen}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Delete Medicine</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Medicine Name</FormLabel>
                <Input
                  type="text"
                  value={medicineName}
                  onChange={(event) => setMedicineName(event.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="red" mr={3}>
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
