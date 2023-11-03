import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Developer from "./pages/Developer";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Private from "./components/Routes/Private";
import Dashboard from "./pages/user/Dashboard";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AllUser from "./pages/Admin/AllUser";
import UserProfile from "./pages/user/UserProfile";
import UserOrder from "./pages/user/UserOrder";
import CreateProduct from "./pages/Admin/CreateProduct";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductInfo from "./ProductInfo/ProductInfo";
import Search from "./pages/Search";
import CategoriesProduct from "./pages/CategoriesProduct/CategoriesProduct";
import CartPage from "./pages/CartPage";
import Orders from "./pages/Admin/Orders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:slug" element={<CategoriesProduct />} />
        <Route path="/product/:slug" element={<ProductInfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<UserOrder />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/product" element={<Product />} />
          <Route path="admin/order" element={<Orders />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/users" element={<AllUser />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/developer" element={<Developer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
