import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyCard, MyFormGroup, MyInputGroup, MyButton } from "components";
import withDataPosting from "../utils/withDataPosting";

const SignupForm: React.FC = (props) => {
  const { postData, data, loading, error } = props;
  const navigate = useNavigate();
  interface FormState {
    username: string;
    // age: number;
    password: string;
    email: string;
  }

  const [formState, setFormState] = useState<FormState>({
    username: "",
    // age: 0,
    password: "",
    email: "",
  });

  function handleChange<K extends keyof FormState>(key: K) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        [key]: event.target.value,
      });
    };
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission logic here, using the current values of username, password, and email
    await postData(formState);
  };

  return (
    <MyCard className="shadow-lg h-full w-full bg-slate-100">
      <h2 className="text-black-20">signup</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <MyFormGroup label="Username" labelFor="username-input">
          <MyInputGroup
            type="input"
            placeholder="please enter your user name"
            value={formState.username}
            onChange={handleChange("username")}
            className="w-full bg-gray-100"
          />
        </MyFormGroup>
        <MyFormGroup label="Email" labelFor="email-input">
          <MyInputGroup
            type="email"
            placeholder="please enter your email"
            value={formState.email}
            onChange={handleChange("email")}
          />
        </MyFormGroup>
        <MyFormGroup label="Password" labelFor="password-input">
          <MyInputGroup
            type="password"
            value={formState.password}
            placeholder="please enter your password"
            onChange={handleChange("password")}
            className="w-full bg-gray-100"
          />
        </MyFormGroup>
        {/* <MyFormGroup label="Age" labelFor="age-input">
          <MyInputGroup
            placeholder="please enter your age"
            value={age}
            onChange={handleAgeChange}
          />
        </MyFormGroup> */}
        <MyButton type="submit" intent="primary" className="w-full">
          {loading ? "Loading..." : "Submit"}
        </MyButton>
      </form>{" "}
      {data && (
        <>
          <h2>Registration Successful!</h2>
          <p>You have been successfully registered.</p>

          <MyButton onClick={() => navigate("/login")}>
            Go to Login Page
          </MyButton>
        </>
      )}
      {error && <p>There was an error posting data.</p>}
    </MyCard>
  );
};
export default withDataPosting(SignupForm, "/api/users/signup");
