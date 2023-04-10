import { Button } from "@blueprintjs/core";
import React, { ReactEventHandler } from "react";

interface MyButtonProps {
  text: string;
  onClick: ReactEventHandler;
  children?: React.ReactNode;
}

export const MyButton: React.FC<MyButtonProps> = ({
  text,
  onClick,
  children,
  ...rest
}) => {
  return (
    <Button {...rest} intent="primary" large={true} onClick={onClick} {...rest}>
      {text}
      {children}
    </Button>
  );
};
