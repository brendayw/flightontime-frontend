import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predictions from "./pages/Predictions";
import BatchPrediction from "./pages/BatchPrediction";
// import "./assets/styles/global.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/batch" element={ <BatchPrediction />} />
      </Route>
    </Routes>
  );
}

export default App;