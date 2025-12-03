import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import EditProductPage from "./pages/EditProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      { path: "add-product", element: <AddProductPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "products/:productId/edit", element: <EditProductPage /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
