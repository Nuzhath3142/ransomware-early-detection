import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login          from './pages/Login';
import Signup         from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard      from './pages/Dashboard';
import ThreatLog      from './pages/ThreatLog';
import AlertsPage     from './pages/Alerts';
import SettingsPage   from './pages/SettingsPage';
import About          from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/"                element={<Navigate to="/login" replace />} />
      <Route path="/login"           element={<Login />} />
      <Route path="/signup"          element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard"       element={<Dashboard />} />
      <Route path="/threat-log"      element={<ThreatLog />} />
      <Route path="/alerts"          element={<AlertsPage />} />
      <Route path="/settings"        element={<SettingsPage />} />
      <Route path="/about"           element={<About />} />
    </Routes>
  );
}

export default App;
