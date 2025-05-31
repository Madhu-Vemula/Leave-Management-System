import { RoleType } from "../Types/enumTypes";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import LeaveHistory from "../features/leave/LeaveHistory";
import HRDashboard from "../pages/HRDashboard";
import LeaveStatusCard from "../features/leave/LeaveStatusCard";
import { Navigate } from "react-router-dom";

/**
 * Configuration for protected routes in the application.
 * Each route is associated with a specific role and contains nested routes.
 */
export const protectedRoutes = [
  {
    path: "employee",
    role: RoleType.EMPLOYEE,
    routes: [
      { path: '', element: <Navigate to="home" /> }, // Redirects to the employee home page.
      { path: "home", element: <EmployeeDashboard /> }, // Employee dashboard.
      { path: "leave-history", element: <LeaveHistory /> }, // Employee leave history page.
    ],
  },

  {
    path: "manager",
    role: RoleType.MANAGER,
    routes: [
      { path: '', element: <Navigate to="home" /> }, // Redirects to the manager home page.
      { path: "home", element: <EmployeeDashboard /> }, // Manager dashboard.
      { path: "leave-history", element: <LeaveHistory /> }, // Manager leave history page.
      { path: "leave-requests", element: <LeaveStatusCard /> }, // Manager leave requests page.
    ],
  },

  {
    path: "hr",
    role: RoleType.HR,
    routes: [
      { path: '', element: <Navigate to="home" /> }, // Redirects to the HR home page.
      { path: "home", element: <HRDashboard /> }, // HR dashboard.
      { path: "leave-history", element: <LeaveHistory /> }, // HR leave history page.
      { path: "leave-requests", element: <LeaveStatusCard /> }, // HR leave requests page.
    ],
  },
];
