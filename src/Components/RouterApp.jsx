
import Home from "./Hero/Home";
import Men from "../Pages/Men";
import Women from "../Pages/Women";
import Collection from "../Pages/Collection";
import Cart from "../Pages/Cart/Cart";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import Contact from "../Pages/Contact";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Profile from "../Pages/Profile";
import Payment from "../Pages/Payment";
import CartItemDetails from "../Pages/Cart/CartItemDetails";
import Searchfield from "../Pages/Searchfield";
import Api from "../utils/Api";

const RouterApp = () => {
  return (
    <div>
      <Api/>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection/:id" element={<CartItemDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/searchfield" element={<Searchfield />} />
        </Routes>
      </div>
    
  );
};

export default RouterApp;
