import { InputGroup } from "@blueprintjs/core";
import { ReactEventHandler } from "react";

interface MyInputGroupProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: ReactEventHandler;
  children?: React.ReactNode;
}

export const MyInputGroup: React.FC<MyInputGroupProps> = (props) => {
  const { placeholder, type, value, onChange, children, ...rest } = props;

  return (
    <InputGroup
      {...rest}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    >
      {children}
    </InputGroup>
  );
};
