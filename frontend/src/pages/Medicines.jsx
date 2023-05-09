import {
  AddMedicine,
  DeleteMedicine,
  AllMedicines,
} from "../components/medicines";

const categories = () => {
  return (
    <>
      <center>
        <h1>Add Medicine</h1>
      </center>
      <AddMedicine></AddMedicine>
      <hr />
      <center>
        <h1>delete Medicine</h1>
      </center>
      <DeleteMedicine />

      <hr />
      <center>
        <h1>All Medicines</h1>
      </center>
      <AllMedicines />
    </>
  );
};
export default categories;
