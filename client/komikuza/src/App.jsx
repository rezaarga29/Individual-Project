import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserLayout from "./components/UserLayout";
import HomePage from "./pages/HomePage";
import WatchListPage from "./pages/WatchList";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/watchlist",
        element: <WatchListPage />,
      },
      {
        path: "/detailpage",
        element: <DetailPage />,
      },
      {
        path: "/update-watchlist/:id",
        element: <EditPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
