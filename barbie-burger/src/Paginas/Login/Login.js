import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Componentes/Botão/Botao"; 
import { CampoTexto } from "../../Componentes/Input/Input"; 
import { LoginError } from "../../API/Erro"; //ok
// import { setRole } from "../../API/ArmazenamentoLocal"; //
import { loginUsuario } from "../../API/Api"; //ok
import { LayoutForm } from "../../Componentes/Layout/Layout"; //ok
import { ErrorMessage } from "../../Componentes/ErrorMenssage/ErrorMessage"; //criar
import {OcultarMsg} from "../../../src/Ajudante/OcultarMsg";
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
        if(response.user.role === "atendente") {
          navigate('/menu')
        }        
        if(response.user.role === "chef") {
          navigate('/kitchen')
        } 
        if(response.user.role === "adm") {
            navigate('/adm')
        }      
        setErrorMessage(LoginError(response));
      })
      
      .catch(() => setErrorMessage(LoginError({ status: 500 })));
     OcultarMsg(setErrorMessage);
  };

  return (
    <>
      <LayoutForm>
        <div className="pai">
          <form className="container-form">
            <h2 className="form-title">Conecte-se</h2>
            
            <CampoTexto
              type="email"
              label="Email"
              value={email}
              name="input"
              // placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CampoTexto
              type="password"
              label="Senha"
              value={password}
              name="input"
              // placeholder="Senha"
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
            <img className="nomeBarbie" src={Barbie} alt="Logo nome Barbie" />
            <img className="hamburguer" src={LogoHamburger} alt="Logo hambúrguer" />
            <img className="nomeburgers" src={Burgers} alt="Logo nome Burgers" />
          </picture>
        </div>
      </LayoutForm>
    </>
  )
}

export default Login;
