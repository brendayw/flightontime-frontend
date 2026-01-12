import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import DashboardPage from "./pages/DashboardPage";
import PredictionsPage from "./pages/PredictionsPage";
import PredictionsGuestPage from "./pages/PredictionsGuestPage";
import BatchPredictionPage from "./pages/BatchPredictionPage";
import ProfilePage from "./pages/ProfilePage";
import NotifyPage from "./pages/NotifyPage";
import WorkspacePage from "./pages/WorkspacePage";
import ProtectedRoute from './routes/ProtectedRoute';
// import "./assets/styles/global.css";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>

        {/* Rutas publicas */}
        <Route index element={<Home />} />

        <Route path="/predictions-guest" element={
          <PredictionsGuestPage />} 
        />
        <Route path="/auth/login" element={<LoginPage /> } />
        <Route path="/auth/signup" element={<SingupPage /> } />

        {/* Rutas protegidas */}
        <Route path="/home" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
            <WorkspacePage />
          </ProtectedRoute> } 
        />

        <Route path="profile" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
            <ProfilePage />
          </ProtectedRoute> }
        />

        <Route path="batch" element={ 
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
            <BatchPredictionPage />
          </ProtectedRoute>
        } />

        <Route path="dashboard" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Predicciones */}
        <Route path="predictions" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
            <PredictionsPage />
          </ProtectedRoute>
        } />

        {/* Predicciones que reciben notificacion / en seguimiento */}
        <Route path="notify" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
            <NotifyPage />
          </ProtectedRoute>
        }/>

      </Route>
    </Routes>
  );
}

export default App;