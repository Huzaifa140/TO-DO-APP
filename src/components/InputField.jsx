import { useId } from "react";

export default function InputField({ label, type = "text", ...rest }) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} {...rest} />
    </div>
  );
}
