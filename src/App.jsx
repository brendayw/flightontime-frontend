import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predictions from "./pages/Predictions";
import BatchPrediction from "./pages/BatchPrediction";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
// import "./assets/styles/global.css";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      {/* en un futuro van a estar protegidas */}
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="profile" element={<ProfilePage /> } />
        <Route path="batch" element={ <BatchPrediction />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="predictions" element={<Predictions />} />
        
      </Route>
    </Routes>
  );
}

export default App;