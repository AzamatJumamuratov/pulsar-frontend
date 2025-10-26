import { Provider as ChakraProvider } from "@/components/ui/provider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import store from "@/app/store";
import { Provider as ReduxProvider } from "react-redux";

import Layout from "./Layout";
import ReceptionPage from "@/pages/ReceptionPage/ReceptionPage";
import DoctorPage from "@/pages/DoctorPage/DoctorPage";

import AuthLayout from "./AuthLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import { Toaster } from "@/components/ui/toaster";
import Test from "@/pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "reception",
        Component: ReceptionPage,
      },
      {
        path: "doctor",
        Component: DoctorPage,
      },
    ],
  },
  {
    path: "/login",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/register",
    element: <Navigate to="/auth/register" replace />,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        index: true,
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
  {
    path: "/test",
    Component: Test,
  },
]);

const Root = () => {
  return (
    <ChakraProvider>
      <ReduxProvider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </ReduxProvider>
    </ChakraProvider>
  );
};

export default Root;
