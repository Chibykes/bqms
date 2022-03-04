import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import AdminHome from './pages/Admin/Home';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminAppointments from './pages/Admin/Appointments';
import AdminOffices from './pages/Admin/Offices';
import AdminServices from './pages/Admin/Services';
import AdminNewService from './pages/Admin/NewService';
import AdminNewOffice from './pages/Admin/NewOffice';
import { AppProvider } from './context/AppContext';
import Appointment from './pages/Appointment';

const App = () => {
  return (

    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/appointments" element={<Appointments />} />
          <Route exact path="/appointments/:id" element={<Appointment />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin/appointments" element={<AdminAppointments />} />
          <Route exact path="/admin/offices" element={<AdminOffices />} />
          <Route exact path="/admin/services" element={<AdminServices />} />
          <Route exact path="/admin/offices/add" element={<AdminNewOffice />} />
          <Route exact path="/admin/services/add" element={<AdminNewService />} />
        </Routes>
      </Router>
    </AppProvider>
    
  );
}


export default App;
