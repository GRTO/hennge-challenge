import React from "react";
import { InputStyles } from "./Input.theme";

interface IInput {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Input: React.FC<IInput> = ({ placeholder, onChange }) => (
  <div css={InputStyles.inputWrapper}>
    <input
      css={InputStyles.inputContainer}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);
