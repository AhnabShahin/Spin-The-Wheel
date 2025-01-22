import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./admin";

const App = () => {
  const handleClick = () => alert("Hello World");

  return (
    <div>
      <Index />
      <button onClick={handleClick}>Clsick Me</button>
    </div>
  );
};

const domNode = document.getElementById("spin-the-wheel-admin");
console.log(domNode);
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
