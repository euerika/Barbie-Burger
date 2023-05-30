import { URL } from './ArmazenamentoLocal.js'

export const CriarUsuario = (endpoint, items) => {
  return fetch(`${URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',      
    },
    body:JSON.stringify({
      name: items.name,
      email: items.email,
      password: items.password,
      role:items.role,
      restaurant: 'Barbie Burgers',      
    }),
  });
};
export const loginUsuario = (endpoint, items) => {
  return fetch(`${URL}${endpoint}` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: items.email,
      password: items.password,
    })
  });
};