import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Componentes/Botão/Botao"; //ok
import { InputElement } from "../../Componentes/Input/Input"; //ok
import { LoginError } from "../../API/Erro"; //ok
import { setRole, setToken } from "../../API/ArmazenamentoLocal"; //ok
import { loginUsuario } from "../../API/Api"; //ok
import { LayoutForm } from "../../../src/Componentes/Layout/Layout"; //ok
import { ErrorMessage } from "../../Componentes/ErrorMenssage/ErrorMessage"; //criar
//import { hideErrorMessage } from "../../helper";
import LogoHamburger from "../../../src/imagem/hamb.png"; //ok
import Barbie from "../../../src/imagem/Barbie.png"; //ok
import Burgers from "../../../src/imagem/Burgers.png"; //ok

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const btnEntrar = (e) => {
    e.preventDefault();
    loginUsuario(email, password)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        setErrorMessage(LoginError(response));
      })
      .then((data) => {
        if (!data) return;
        console.log(data.token);
        setToken(data.token);
        setRole(data.role);
        navigate(data.role === "atendente" ? "/menu" : "/kitchen");
      })
      .catch(() => setErrorMessage(LoginError({ status: 500 })));
    // hideErrorMessage(setErrorMessage);
  };

  return (
    <>
      <LayoutForm>
        <div class="pai">
          <form className="container-form">
            <h2 className="form-title">Login</h2>
            <InputElement
              type="email"
              value={email}
              name="input"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputElement
              type="password"
              value={password}
              name="input"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage             
              disable={errorMessage ? false : true}
              message={errorMessage}
            />
            <Button onClick={btnEntrar}>Entrar</Button>
            <p className="text-center">
              <span className="text-span">Não possui conta? </span>
              <Link className="text-link" to="/register">
                Cadastre-se
              </Link>
            </p>
          </form>

          <picture className="imgs">
            <img className="nomeBarbie" src={Barbie} alt="logo" />
            <img className="hamburguer" src={LogoHamburger} alt="logo" />
            <img className="nomeburgers" src={Burgers} alt="logo" />
          </picture>
        </div>
      </LayoutForm>
    </>
  );
};
