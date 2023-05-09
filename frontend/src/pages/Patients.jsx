import {
  AddPatientForm,
  DeletePatient,
  EditPatient,
  GetAllPatients,
} from "../components/patients";

const Patients = () => {
  return (
    <>
      <center>
        <h1>Add Patient</h1>
      </center>
      <AddPatientForm></AddPatientForm>
      <hr />
      <center>
        <h1>delete Patient</h1>
      </center>
      <DeletePatient />

      <hr />
      <center>
        <h1>update Patient</h1>
      </center>
      <EditPatient />

      <hr />
      <center>
        <h1>All patients</h1>
      </center>
      <GetAllPatients />
    </>
  );
};

export default Patients;
