import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";

// components
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <HomePage />
        </>
      ),
    },
    {
      path: "/inventory",
      element: (
        <>
          <Navbar />
          <InventoryPage />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
        <>
          <Navbar />
          <OrdersPage />
        </>
      ),
    },
    {
      path: "/customers",
      element: (
        <>
          <Navbar />
          <CustomersPage />
        </>
      ),
    },
    {
      path: "/reports",
      element: (
        <>
          <Navbar />
          <ReportsPage />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <LoginPage />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <SignUpPage />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}