import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./start.css";
import "./index.css";
import App from "app/app";
import ErrorPage from "./app/error-page";
import LoginForm from "./pages/LoginForm";
import { Dashboard, DashboardUser, DashboardAdmin } from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/user",
    element: <DashboardUser />,
  },
  {
    path: "/dashboard/admin",
    element: <DashboardAdmin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
