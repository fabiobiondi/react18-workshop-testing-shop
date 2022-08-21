import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./core/components/NavBar";
import ShopPage from "./pages/shop/ShopPage";
import CartSummaryPanel from "./core/components/CartSummaryPanel";
import AdminPage from "./pages/admin/AdminPage";
import ProductPage from "./pages/shop/ProductPage";
import CheckoutConfirmPage from "./pages/checkout/CheckoutConfirmPage";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import LoginPage from "./pages/login/LoginPage";
import {PrivateRoute} from "./shared/auth/components/PrivateRoute";
import {Interceptor} from "./shared/auth/components/Interceptor";

function App() {

  return (
    <div>
      <Interceptor />
      <NavBar />
      <div className="pt-40 lg:pt-24">
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="admin" element={
            <PrivateRoute path="/login" element={<AdminPage />} />
          } />
          <Route path="login" element={<LoginPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/:id" element={<ProductPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout-confirm" element={<CheckoutConfirmPage />} />
          <Route path="*" element={
            <Navigate to="/home" />
          } />
        </Routes>
      </div>
      <CartSummaryPanel />
    </div>
  );
}

export default App;
