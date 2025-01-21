import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  const handleClick = () => alert("Hello World");

  return (
    <div>
      <h1>Hello World React Plugin</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};


const domNode = document.getElementById('hello-world-react-root');
console.log(domNode);
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
