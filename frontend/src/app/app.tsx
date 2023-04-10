import React from "react";
import SignupForm from "../pages/SignupForm";
import MainPhoto from "components/MainPhoto.js";
const App: React.FC = () => {
  return (
    <div className="flex w-full">
      <div className="w-[30%] shadow-lg">
        <SignupForm />
      </div>
      <div className="w-[70%]">
        <MainPhoto />
      </div>
    </div>
  );
};

export default App;
