import React from "react";
import Home from "./Home";
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
const RouterApp = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
};

export default RouterApp;
