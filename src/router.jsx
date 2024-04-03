import isElectron from "is-electron";
import { useCallback } from "react";
import {
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";

import Error from "./components/error/Error";
import Root from "./components/root/Root";
import ProtectedRoute from "./components/util-components/Protected-Route";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import File from "./pages/File";
import Folder from "./pages/Folder";
import FolderDetail from "./pages/FolderDetail";
import Register from "./pages/Register";
import { useGlobal } from "./hooks";

function createRouter(routes) {
  return isElectron()
    ? createMemoryRouter(routes)
    : createBrowserRouter(routes);
}

const Router = () => {
  const token = useGlobal((state) => state.token);

  const indexElement = useCallback(() => {
    if (!token) {
      return <Login />;
    } else {
      return (
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
      );
    }
  }, [token]);

  const router = useCallback(
    () =>
      createRouter([
        {
          path: "/",
          element: <Root />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: indexElement(),
              errorElement: <div />,
            },
            {
              path: "login",
              element: <Login />,
              errorElement: <div />,
            },
            {
              path: "register",
              element: <Register />,
              errorElement: <div />,
            },
            {
              path: "folders",
              element: (
                <ProtectedRoute>
                  <Folder />
                </ProtectedRoute>
              ),
              errorElement: <div />,
            },
            {
              path: "folders/:folderId",
              element: (
                <ProtectedRoute>
                  <FolderDetail />
                </ProtectedRoute>
              ),
              errorElement: <div />,
            },
            {
              path: "files",
              element: (
                <ProtectedRoute>
                  <File />
                </ProtectedRoute>
              ),
              errorElement: <div />,
            },
          ],
        },
      ]),
    [indexElement]
  );

  return <RouterProvider router={router()} />;
};

export default Router;
