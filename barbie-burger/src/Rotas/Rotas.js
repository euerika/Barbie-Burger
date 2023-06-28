import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
//import { Cadastro } from "../Paginas/Cadastro/Cadastro";
import  Login  from "../Paginas/Login/Login";
import  Menu from "../Paginas/Menu/Menu";
//import { Kitchen } from "../Paginas/Cozinha/Cozinha";
import  OrdemPedido  from "../../src/Componentes/OrdemPedido/OrdemPedido";
import { OrdemDelivery } from "../Paginas/OrdemDelivery/OrdemDelivery";
//import { getToken } from "../API/ArmazenamentoLocal";



const App = () => (
  <BrowserRouter className="app">
    <Routes>
      <Route exact path="/" element={<Login />} />
      {/* <Route path="/cadastro" element={<Register />} /> */}
      <Route path="/menu" element={<Menu />} />
       <Route path="/OrdemPedido" element={<OrdemPedido />} />
       <Route path="/OrdemDelivery" element={<OrdemDelivery />} />
      {/* <Route path="/kitchen" element={<Kitchen />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App