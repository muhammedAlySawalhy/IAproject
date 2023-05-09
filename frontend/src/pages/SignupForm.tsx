import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyCard, MyFormGroup, MyInputGroup, MyButton } from "components";
import withDataPosting from "utils/withDataPosting";

const SignupForm: React.FC = (props) => {
  const { postData, data, loading, error } = props;
  const navigate = useNavigate();

  interface FormState {
    username: string;
    password: string;
    email: string;
  }

  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
    email: "",
  });
  const [showGoToLoginButton, setShowGoToLoginButton] = useState(false);

  useEffect(() => {
    if (data && !error && !loading) {
      console.log("done");
      setShowGoToLoginButton(true);
    }
  }, [data, error, loading]);

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
        <MyButton type="submit" intent="primary" className="w-full">
          {loading ? "Loading..." : "Submit"}
        </MyButton>
      </form>{" "}
      {showGoToLoginButton && (
        <div>
          <p>You have been successfully registered.</p>
          <MyButton
            onClick={() => navigate("/login")}
            intent="primary"
            className="w-full"
          >
            Go to Login
          </MyButton>
        </div>
      )}
      {error !== "noError" ? <p>{error}</p> : <></>}
    </MyCard>
  );
};

export default withDataPosting(SignupForm, "/api/user/signup");
