import React, { ReactNode } from "react";
import "../public/css/global.css";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
