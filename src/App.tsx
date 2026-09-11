import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SpatialDashboardLayout from './components/SpatialDashboardLayout';
import Dashboard from './pages/Dashboard';
import Sandbox from './pages/Sandbox';
import Roleplay from './pages/Roleplay';
import Toolkit from './pages/Toolkit';
import Review from './pages/Review';
import B2BManager from './pages/B2BManager';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import FlashcardDetail from './pages/FlashcardDetail';
import EngineerProfile from './pages/EngineerProfile';
import SettingsPage from './pages/Settings';
import UserProfile from './pages/UserProfile';
import PlanDetail from './pages/PlanDetail';
import ReviewDetail from './pages/ReviewDetail';
import ScenarioDetail from './pages/ScenarioDetail';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<SpatialDashboardLayout />}>
           <Route path="dashboard" element={<Dashboard />} />
           <Route path="sandbox" element={<Sandbox />} />
           <Route path="roleplay" element={<Roleplay />} />
           <Route path="toolkit" element={<Toolkit />} />
           <Route path="review" element={<Review />} />
          <Route path="review/:id" element={<ReviewDetail />} />
           <Route path="b2b" element={<B2BManager />} />
                     <Route path="pricing" element={<Pricing />} />
          <Route path="pricing/pro" element={<PlanDetail />} />
          <Route path="toolkit/:id" element={<FlashcardDetail />} />
          <Route path="b2b/:id" element={<EngineerProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="sandbox/:id" element={<ScenarioDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
