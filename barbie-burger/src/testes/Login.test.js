// import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
// import loginUsuario from "../API/Api";
// import Login from "../Paginas/Login/Login";
// import { useNavigate } from "react-router-dom";


// jest.mock('../API/Api');


// jest.mock('react-router-dom', () => ({
//     useNavigate: jest.fn(),
//   }));

//   describe('Login', () => {
//     test('Realizar o login do usuário já cadastrado', async () => {
//         const navigate = jest.fn();
//         useNavigate.mockReturnValue(navigate);
//         // loginUsuario.mockResolvedValueOnce({
//         //     user: { role: 'atendente'},
//         // });

//         const { getByLabelText, getByText } = render(<Login />);

//         const emailInput = getByLabelText('Email: ');
//         const senhaInput = getByLabelText('Senha: ');
//         const botaoButton = getByText('Entrar');

//         fireEvent.change(emailInput, { target: { value: 'test@example.com'}});
//         fireEvent.change(senhaInput, { target: { value: 'password' }});

//         fireEvent.click(botaoButton);

//         await waitFor(() => {
//             expect(loginUsuario).toHaveBeenCalledWith('test@example.com', 'password');
//             expect(navigate).toHaveBeenCalledWith('/atendente');
//         });
//      });
//   });