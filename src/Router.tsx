import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Contato } from "./pages/main/Contato";
import { Gdoor } from "./pages/main/Gdoor";
import { Index } from "./pages/main/Index";
import { Login } from "./pages/main/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/Contato",
        element: <Contato />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Gdoor",
        element: <Gdoor />,
      },
    ],
  },
]);
