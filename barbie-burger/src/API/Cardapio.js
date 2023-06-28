//import { getToken } from "./ArmazenamentoLocal";
import {getLocalStorageItem, getToken}from "./ArmazenamentoLocal"
const API_URL = "https://burger-queen-api-mock-mu.vercel.app";

export const pegarProdutos = (token) => fetch(`${API_URL}/products`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

export const criarPedidos = (client, table, products) => {
   const authToken = getToken();
   console.log({authToken})
   fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${authToken}`},
    body: JSON.stringify({
      client: client,
      table: table,
      products: products,
    }),
  });
};

export const pegarPedidos = (token) => {
  return fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
  });
};

export const atualizarPedidos = (ordemId, status) => {
  return fetch(`${API_URL}/orders/${ordemId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json", Authorization: getToken()},
  body: JSON.stringify({status})
  });
};
