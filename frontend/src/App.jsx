import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/index.js";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import CreateASpot from "./components/CreateASpot/CreateASpot.jsx";
import SpotDetail from "./components/SpotDetail/SpotDetail.jsx";
import ManageSpots from "./components/ManageSpots/ManageSpots.jsx";
import UpdateASpot from "./components/UpdateASpot";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
    return () => {
      setIsLoaded(false);
    };
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/spots/new",
        element: <CreateASpot />,
      },
      {
        path: "/spots/:id",
        element: <SpotDetail />,
      },
      {
        path: "/spots/current",
        element: <ManageSpots />,
      },
      {
        path:'/spots/:spotId/edit',
        element: <UpdateASpot />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
