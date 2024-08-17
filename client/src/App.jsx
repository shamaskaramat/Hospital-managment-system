import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import RoleForm from './pages/RoleForm';
import PatientLogin from './components/Forms/PatientLogin';
import PatientRegister from './components/Forms/PatientRegister';
import PatientForgotPassword from './components/Forms/PatientForgotPassword';
import PatientResetPassword from './components/Forms/PatientResetPassword';
import DoctorLogin from './components/Forms/DoctorLogin';
import AdminLogin from './components/Forms/AdminLogin';
import Dashboard from './pages/admin/AdminDashboard';
import PatientList from './pages/admin/PatientList';
import DoctorList from './pages/admin/DoctorList';
import Appointments from './pages/admin/Appointments';
import AddDoctor from './pages/admin/AddDoctor';
import DeleteDoctor from './pages/admin/DeleteDoctor';
import Messages from './pages/admin/Messages';
import PatientDashboard from './pages/patient/PatientDashboard';
import AppointmentHistory from './pages/patient/AppointmentHistory';
import PatientAppointments from './pages/patient/PatientAppointments';
import MainPatientContent from './pages/patient/MainPatientContent';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import MainDoctorContent from './pages/doctor/MainDoctorContent';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import MainContent from './pages/admin/Main';
import Home from './pages/Home';
import Departments from './pages/admin/Departments';
import PatientMessages from './pages/patient/PatientMessages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  // {
  //   path: '/login',
  //   element: <Layout><PatientLogin /></Layout>
  // },
  // {
  //   path: '/register',
  //   element: <Layout><PatientRegister /></Layout>
  // },
  {
    path: '/forgot',
    element: <Layout><PatientForgotPassword /></Layout>
  },
  {
    path: '/reset',
    element: <Layout><PatientResetPassword /></Layout>
  },
  // {
  //   path: 'doctor/login',
  //   element: <Layout><DoctorLogin /></Layout>
  // },
  // {
  //   path: 'admin/login',
  //   element: <Layout><AdminLogin /></Layout>
  // },
  {
    path: '/admin',
    element: <Layout><Dashboard /></Layout>,
    children: [
      { path: '', element: <MainContent /> },
      { path: 'patientlist', element: <PatientList /> },
      { path: 'manage-doctors', element: <DoctorList /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'add-doctor', element: <AddDoctor /> },
      { path: 'delete-doctor', element: <DeleteDoctor /> },
      { path: 'messages', element: <Messages /> },
      { path: 'departments', element: <Departments /> },
    ],
  },
  {
    path: '/patient',
    element: <Layout><PatientDashboard /></Layout>,
    children: [
      { path: '', element: <MainPatientContent /> },
      { path: 'create-appointments', element: <PatientAppointments /> },
      { path: 'appointments-history', element: <AppointmentHistory /> },
      { path: 'messages', element: <PatientMessages /> },
    ],
  },
  {
    path: '/doctor',
    element: <Layout><DoctorDashboard /></Layout>,
    children: [
      { path: '', element: <MainDoctorContent /> },
      { path: 'appointments', element: <DoctorAppointments /> },
    ],
  },
]);

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
