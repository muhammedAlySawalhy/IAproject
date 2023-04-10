import React from "react";
import { FormGroup as BPFormGroup } from "@blueprintjs/core";

interface MyFormGroupProps {
  label: string;
  labelFor: string;
  children?: React.ReactNode;
  className: string;
}

export const MyFormGroup: React.FC<MyFormGroupProps> = ({
  label,
  labelFor,
  children,
  ...rest
}) => {
  return (
    <BPFormGroup label={label} labelFor={labelFor} {...rest}>
      {children}
    </BPFormGroup>
  );
};
