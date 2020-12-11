import React, { FC } from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button: FC<ButtonProps> = ({ onClick, disabled, className }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      Generate Shortened Url
    </button>
  );
};

export default Button;
