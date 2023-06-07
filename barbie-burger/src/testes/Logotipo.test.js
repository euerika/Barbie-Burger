import React from "react";
import { render, screen, fireEvent, getByLabelText } from "@testing-library/react";
import  { Login }  from "../Paginas/Login/Login";
import { MemoryRouter } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';


jest.mock('../API/Api');

describe('Login', () => {
    test('verificar a imagem logotipo renderiza corretamente', () => {
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);
        const elementoLogotipo = screen.getByRole('img', { name: "Logo nome Barbie" });
        expect(elementoLogotipo).toBeInTheDocument();
    });

    test('verificar a imagem logotipo renderiza corretamente', () => {
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);
        const hamburguerLogotipo = screen.getByRole('img', { name: "Logo hambúrguer" });
        expect(hamburguerLogotipo).toBeInTheDocument();
    });

    it('deverá renderizar a mensagem conecte-se', () => {
        render(<MemoryRouter>
            <Login/>
        </MemoryRouter>);

       const mensagemInicial = screen.getByText('Conecte-se');
       expect(mensagemInicial).toBeInTheDocument();
    });

    it('deverá redefinir o estado do formulário após o envio', () => {
        const { getByLabelText,getByText }  = render(
            <MemoryRouter>
             <Login />
             </MemoryRouter>
         );

        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Senha');
        const loginButton = getByText('Entrar');
      
        fireEvent.change(emailInput, { target: { value: 'testes@email.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.click(loginButton);
      
    
      
        expect(emailInput.value).toBe('testes@email.com');
        expect(passwordInput.value).toBe('123456');
      })
});



