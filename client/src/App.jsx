import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProductPage from "./pages/ProductsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";

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
      path: "/productPage",
      element: (
        <>
          <Navbar />
          <ProductPage />
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
      path: "/wishlist",
      element: (
        <>
          <Navbar />
          <WishlistPage />
        </>
      ),
    },
    {
      path: "/support",
      element: (
        <>
          <Navbar />
          <SupportPage />
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