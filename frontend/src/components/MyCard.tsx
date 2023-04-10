import { Card } from "@blueprintjs/core";

interface MyCardProps {
  title: string;
  content: string;
  className?: string; // added className prop
  children?: React.ReactNode;
}

export const MyCard: React.FC<MyCardProps> = ({
  className, // added className prop
  children,
  ...rest
}) => {
  return (
    <Card
      className={`bg-white p-4 rounded-md shadow-md ${className}`}
      {...rest}
    >
      {children}
    </Card>
  );
};
