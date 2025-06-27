import App from "@/App";
import About from "@/pages/About/About";
import Landing from "@/pages/Landing/Landing";
import Home from "@/pages/Home/Home";

import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <About />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
