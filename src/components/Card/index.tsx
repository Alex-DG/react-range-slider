import React from "react";
import "./styles.css";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Card = ({ children, title }: Props) => {
  return (
    <div className="container">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
