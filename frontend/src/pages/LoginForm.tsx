import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyCard, MyFormGroup, MyInputGroup, MyButton } from "components";
import withDataPosting from "../utils/withDataPosting";

const LoginForm: React.FC = (props) => {
  const { postData, data, loading, error } = props;
  const navigate = useNavigate();

  interface FormState {
    username: string;
    password: string;
  }

  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
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
    await postData(formState);
  };

  return (
    <MyCard className="shadow-lg h-full w-full bg-slate-100">
      <h2 className="text-black-20">login</h2>
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
        <MyFormGroup label="Password" labelFor="password-input">
          <MyInputGroup
            type="password"
            value={formState.password}
            placeholder="please enter your password"
            onChange={handleChange("password")}
            className="w-full bg-gray-100"
          />
        </MyFormGroup>
        <MyButton type="submit" intent="primary" className="w-full">
          {loading ? "Loading..." : "Submit"}
        </MyButton>
      </form>
      {console.log(data)}
      {data && (
        <>
          <h2>login Successful!</h2>

          <MyButton onClick={() => navigate("/dashboard")}>
            Go to Login Page
          </MyButton>
        </>
      )}
      {error && <p>There was an error posting data.</p>}
    </MyCard>
  );
};

export default withDataPosting(LoginForm, "/api/users/login");
