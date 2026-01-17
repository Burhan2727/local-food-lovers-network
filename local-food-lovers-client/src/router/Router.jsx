import { createBrowserRouter } from "react-router";
import Home from "../components/Home";
import MainLayout from "../layouts/MainLayout";
import AddReviewPage from "../pages/AddReviewPage";
import LoginPage from "../pages/LoginPage";
import MyReviewsPage from "../pages/MyReviewsPage";
import RegisterPage from "../pages/RegisterPage";
import Review from "../pages/Review";
import AllReviews from "../pages/AllReviews";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/add-review",
        element: <AddReviewPage></AddReviewPage>
      },
      {
        path: "/review",
        element: <Review></Review>
      },
      {
        path: "all-reviews",
        element: <AllReviews></AllReviews>
      },
      {
        path: "/my-review",
        element: <MyReviewsPage></MyReviewsPage>
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