import { createBrowserRouter, RouterProvider } from "react-router";

import { ProductProvider } from "./context/productContext";
import { AuthProvider } from "./context/authContext";
import Nav from "./Components/Nav/Nav";
import HomePageLayout from "./pages/HomePageLayout";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Cart from "./components/Cart/Cart";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Nav,
      children: [
        {
          index: true,
          Component: HomePageLayout,
        },
        { path: "signup", Component: SignUp },
        { path: "signin", Component: SignIn },
        { path: "cart", Component: Cart },
      ],
    },
  ]);
  return (
    <div>
      <ProductProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ProductProvider>
    </div>
  );
};

export default App;
