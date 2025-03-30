import { useState } from "react";

function InputField({
  label,
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div style={{ marginBottom: "15px", position: "relative" }}>
      {label && <label>{label}</label>}
      <input
        type={isPasswordType ? (showPassword ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "5px",
          paddingRight: isPasswordType ? "60px" : "10px", 
        }}
      />
      {isPasswordType && (
        <span
          onClick={toggleVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "35px",
            cursor: "pointer",
            fontSize: "13px",
            color: "#007bff",
            userSelect: "none",
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      )}
    </div>
  );
}

export default InputField;
