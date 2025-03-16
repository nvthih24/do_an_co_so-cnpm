import React from "react";

const Button = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary: "bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700",
    outline: "border border-gray-300 text-gray-700 px-4 py-2 rounded-md",
    secondary: "bg-gray-200 text-gray-800 px-4 py-2 rounded-md",
  };
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
};

// Xuất đúng cách
export default Button;
