import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Search from "../pages/Search";
import ProductDetails from "../pages/ProductDetails";
import Success from "../pages/Success";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Orders from "../pages/Order";
import OrderDetails from "../pages/OrderDetails";
import UpdateCustomer from "../pages/UpdateCustomer";


export default [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/Cart",
    element: Cart,
  },
  {
    path: "/Category-:id",
    element: Category,
  },

  {
    path: "/Search",
    element: Search,
  },
  {
    path: "/ProductDetails-:id",
    element: ProductDetails,
  },
  {
    path: "/Success",
    element: Success,
  },
  {
    path: "*",
    element: NotFound,
  },
  {
    path: "/Register",
    element: Register,
  },
  {
    path: "/Login",
    element: Login,
  },
  {
    path: "/Orders",
    element: Orders,
  },
  {
    path: "/OrderDetail-:id",
    element: OrderDetails,
  },
  {
    path: "/UpdateCustomer-:id",
    element: UpdateCustomer,
  },
];
