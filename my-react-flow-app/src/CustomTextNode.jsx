import React, { useState } from "react";

const CustomTextNode = ({ data }) => {
  const [text, setText] = useState(data.text || "");

  const handleChange = (e) => {
    setText(e.target.value);
    if (data.onChange) {
      data.onChange(e.target.value); // Propagate changes if needed
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        placeholder="Enter text here..."
      />
    </div>
  );
};

export default CustomTextNode;
