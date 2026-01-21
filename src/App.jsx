import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import HistoryPage from "./pages/HistoryPage";
import DashboardPage from "./pages/DashboardPage";
import PredictionsPage from "./pages/PredictionsPage";
import PredictionsGuestPage from "./pages/PredictionsGuestPage";
import BatchPredictionPage from "./pages/BatchPredictionPage";
import ProfilePage from "./pages/ProfilePage";
import FlightsPage from "./pages/FlightsPage";
import WorkspacePage from "./pages/WorkspacePage";
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>

        {/* Rutas publicas */}
        <Route index element={
          <PublicRoute> <Home /> </PublicRoute>
        }/>
        
        <Route path="/auth/login" element={
          <PublicRoute> <LoginPage/> </PublicRoute> 
        }/>

        <Route path="/predictions-guest" element={ 
          <PublicRoute>
            <PredictionsGuestPage />
          </PublicRoute>
        }/>
        
        <Route path="/auth/signup" element={
          <PublicRoute > <SingupPage /> </PublicRoute>
        }/>

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
        
        <Route path="/admin/history" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <HistoryPage />
          </ProtectedRoute>
        } />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
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
        <Route path="flights" element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <FlightsPage />
          </ProtectedRoute>
        }/>

      </Route>
    </Routes>
  );
}

export default App;