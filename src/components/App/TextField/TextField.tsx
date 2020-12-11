import React, { FC } from 'react';

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
}

const TextField: FC<TextFieldProps> = ({
  onChange,
  placeholder = 'URL',
  className,
}) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextField;
