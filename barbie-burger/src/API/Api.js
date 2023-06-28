import { setToken } from "./ArmazenamentoLocal";
const URL ='https://burger-queen-api-mock-mu.vercel.app'

export const CriarUsuario = (name, email, password, role) => {
  return fetch(`${URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
      restaurant: 'Barbie Burgers',      
    }),
  });
};
export async function loginUsuario(email, password) {
 const response = await fetch(`${URL}/login` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    })  
  });
  const data = await response.json();
  const token = data.accessToken;
  setToken(token);
  console.log(data)
  return data
}

