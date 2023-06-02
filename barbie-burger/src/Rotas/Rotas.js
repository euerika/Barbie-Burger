import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Cadastro } from "../Paginas/Cadastro/Cadastro";
import { Login } from "../Paginas/Login/Login";
import { Menu } from "../Paginas/Menu/Menu";
//import { Kitchen } from "./pages/Kitchen";
//import { OrdersHistory } from "./pages/OrdersHistory";
//import { OrdersDelivery } from "./pages/OrdersDelivery";
import { getToken } from "../API/ArmazenamentoLocal";

export const TodasAsRotas = () => {
  const RotaPrivada = ({ children, redirectTo }) => {
    const isAuth = getToken() !== null;
    return isAuth ? children : <Navigate to={redirectTo} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exect path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route
          path="/menu"
          element={
            <RotaPrivada redirectTo="/">
              <Menu />
            </RotaPrivada>
          }
        />
        {/* <Route
          path="/kitchen"
          element={
            <RotaPrivada redirectTo="/">
              <Kitchen />
            </RotaPrivada>
          }
        />
        {/* <Route */}
          {/* path="/orders-delivery"
          element={
            <RotaPrivada redirectTo="/">
              <OrdersDelivery />
            </RotaPrivada>
          }
        /> */} 
         {/* <Route
          path="/orders-history"
          element={
            <RotaPrivada redirectTo="/">
              <OrdersHistory />
            </RotaPrivada>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};