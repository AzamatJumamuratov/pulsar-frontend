import { Provider } from "@/components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "@/pages/Home/HomePage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);

const Root = () => {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Root;
