import {
  MyCard,
  MyInputGroup,
  MyButton,
  MedicineRequest,
  SideBar,
  GroupMedicine,
  HelpDoc,
} from "../components";
import { HTMLTable, Tag } from "@blueprintjs/core";

export function DashboardPatient() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <SideBar /> */}
      {/* Main content area */}
      <div className="flex-1 p-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Medicine Request form */}
        <MedicineRequest />
        {/* Group of medicine */}
        <GroupMedicine />
        {/* Help from Doctors */}
      </div>
    </div>
  );
}
