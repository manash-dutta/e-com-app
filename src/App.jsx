import { createBrowserRouter, RouterProvider } from "react-router";

import { ProductProvider } from "./context/productContext";
import Nav from "./Components/Nav/Nav";
import HomePageLayout from "./pages/HomePageLayout";

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
      ],
    },
  ]);
  return (
    <div>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </div>
  );
};

export default App;
