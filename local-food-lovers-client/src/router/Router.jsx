import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import MainLayout from "../layouts/MainLayout";
import AddReviewPage from "../pages/AddReviewPage";
import LoginPage from "../pages/LoginPage";
import MyReviewsPage from "../pages/MyReviewsPage";
import RegisterPage from "../pages/RegisterPage";
import AllReviews from "../pages/AllReviews";
import PrivateRoute from "./PrivateRoute";
import EditReviews from "../pages/EditReviews";
import MyFavourite from "../pages/MyFavourite";
import FoodDetails from "../pages/FoodDetails";
import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/add-review",
        element: <PrivateRoute>
          <AddReviewPage></AddReviewPage>
        </PrivateRoute>
      },
      {
        path: "all-reviews",
        element: <AllReviews></AllReviews>
      },
      {
        path: "/my-review",
        element: <PrivateRoute>
          <MyReviewsPage></MyReviewsPage>
        </PrivateRoute>
      },
      {
        path: "/my-favourites",
        element: <PrivateRoute>
          <MyFavourite></MyFavourite>
        </PrivateRoute>
      },
      {
        path: "/food-details/:id",
        element: <PrivateRoute>
          <FoodDetails></FoodDetails>
        </PrivateRoute>
      },
      {
        path: "/edit-review/:id",
        element: <PrivateRoute>
          <EditReviews></EditReviews>
        </PrivateRoute>
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>
      },
      {
        path: "/registration",
        element: <RegisterPage></RegisterPage>
      }
    ]
  },
]);