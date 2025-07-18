import React from "react";

function Button({ children, onClick, type = "button", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "0.5rem 1rem",
        background: "#3182ce",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
