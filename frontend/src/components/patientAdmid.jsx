import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const AddMedicine = () => {
  const { medicine_id, patient_id } = useParams();
  const [medicineName, setMedicineName] = useState();
  const handleAddMedicine = async () => {
    try {
      const medicine = await await fetch("/api/patient/add_medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicineName, patient_id),
      });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medicineId: medicine_id,
          patientId: patient_id,
          action: `add medicine ${medicineName}`,
        }),
      };

      const response = await fetch("/api/requests/request", requestOptions);
      const data = await response.json();
      console.log(`Created request ${data.id} for medicine ${medicine.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <FormControl id="medicine-name" isRequired>
        <FormLabel>Medicine Name</FormLabel>
        <Input
          type="text"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
      </FormControl>

      <Button mt={4} colorScheme="teal" onClick={handleAddMedicine}>
        Add Medicine
      </Button>
    </Box>
  );
};

export default AddMedicine;
