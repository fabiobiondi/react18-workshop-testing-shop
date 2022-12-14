import { Navigate, Route, Routes } from "react-router-dom";
import {
  AdminPage,
  CheckoutConfirmPage,
  CheckoutPage,
  HelloCypress,
  HomePage,
  LoginPage,
  ProductPage,
  ShopPage,
} from "./pages";
import NavBar from "./core/components/NavBar";
import CartSummaryPanel from "./core/components/CartSummary";
import { Interceptor } from "./shared/auth/components/Interceptor";
import { PrivateRoute } from "./shared/auth/components/PrivateRoute";

function App() {
  return (
    <div>
      <Interceptor />
      <NavBar />
      <div className="pt-40 lg:pt-24">
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route
            path="admin"
            element={<PrivateRoute path="/login" element={<AdminPage />} />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/:id" element={<ProductPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout-confirm" element={<CheckoutConfirmPage />} />
          <Route path="hello-cypress" element={<HelloCypress />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      <CartSummaryPanel />
    </div>
  );
}

export default App;
