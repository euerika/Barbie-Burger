const URL ='https://burger-queen-api-mock-psi.vercel.app'

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
export const loginUsuario = (email, password) => {
  return fetch(`${URL}/login` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  });
};