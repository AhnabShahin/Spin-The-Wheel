import { Suspense } from '@wordpress/element';
import { createRoot } from '@wordpress/element';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="spin-the-wheel-admin-wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

const domNode = document.getElementById("spin-the-wheel-admin");
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
