
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PatientSignIn from "./PatientSignIn";
import PatientSignUp from "./PatientSignUp";
import PatientForgotPassword from "./PatientForgotPassword";
import PatientDashboard from "./PatientDashboard";
import PatientMessages from "../components/patient-portal/PatientMessages";
import PatientHealthRecords from "../components/patient-portal/PatientHealthRecords";
import PatientLayout from "../components/patient-portal/PatientLayout";
import { toast } from "sonner";

const PatientPortal: React.FC = () => {
  const isAuthenticated = localStorage.getItem("patientAuth") === "true";

  const handleSignOut = () => {
    localStorage.removeItem("patientAuth");
    localStorage.removeItem("patientEmail");
    toast.info("Signed out successfully");
  };

  return (
    <Routes>
      <Route path="/signin" element={<PatientSignIn />} />
      <Route path="/signup" element={<PatientSignUp />} />
      <Route path="/forgot-password" element={<PatientForgotPassword />} />
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <PatientLayout onSignOut={handleSignOut}>
              <Routes>
                <Route path="/" element={<PatientDashboard />} />
                <Route path="/messages" element={<PatientMessages />} />
                <Route path="/health-records" element={<PatientHealthRecords />} />
              </Routes>
            </PatientLayout>
          ) : (
            <Navigate to="/patient/signin" replace />
          )
        }
      />
    </Routes>
  );
};

export default PatientPortal;
