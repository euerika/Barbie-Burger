// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../../components/Button";
// import { InputElement } from "../../components/Input";
// import { LayoutForm } from "../../components/Layout";
// import { MensagemErro} from "../../API/Erro";//ok
// import { CriarUsuario } from "../../API/Api";//ok
// import { RegistroErro } from "../../API/Erro";//ok
// import { setRole, setToken } from "../../API/ArmazenamentoLocal";//ok
// import { hideErrorMessage } from "../../helper";

// export const Cadastro = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [roleUser, setRoleUser] = useState("atendente");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const btnCadastrar = (e) => {
//     e.preventDefault();
//     CriarUsuario(name, email, password, roleUser)
//       .then((response) => {
//         if (response.status === 200) {
//           return response.json();
//         }
//       setErrorMessage(RegistroErro(response));
//       })
//       .then((data) => {
//         if(!data) return;
//         console.log(data.token);
//         setToken(data.token);
//         setRole(data.role);
//         navigate("/");
//       })
//       .catch(() => setErrorMessage(RegistroErro({status:500})));
//       hideErrorMessage(setErrorMessage);
//   };

//   return (
//     <>
//       <LayoutForm>
//       <img className="logo" src={Logo} alt="logo"/>
//         <form className="container-form">
//           <h2 className="form-title">Cadastre-se</h2>
//           <InputElement
//             type="text"
//             label="Nome"
//             value={name}
//             name="input"
//             placeholder="Digite o seu nome completo"
//             onChange={(e) => setName(e.target.value)}
//           />
//           <InputElement
//             type="email"
//             label="E-mail"
//             value={email}
//             name="input"
//             placeholder="user@user.com"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <InputElement
//             type="password"
//             label="Senha"
//             value={password}
//             name="input"
//             placeholder="******"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="input-radio-container">
//           <InputElement
//             type="radio"
//             className="input-radio"
//             classNameLabel="label-radio input-label"
//             label="Atendente"
//             value="atendente"
//             name="role"
//             checked={roleUser === "atendente"}
//             onChange={(e) => setRoleUser(e.target.value)}
//           />
//           <InputElement
//             type="radio"
//             className="input-radio"
//             classNameLabel="label-radio input-label"
//             label="Cozinha"
//             value="kitchen"
//             name="role"
//             checked={roleUser === "kitchen"}
//             onChange={(e) => setRoleUser(e.target.value)}
//           />
//           </div>
//           <MensagemErro
//             disable={errorMessage ? false : true}
//             message={errorMessage}
//           />
//           <Button onClick={btnCadastrar}>Cadastrar</Button>
//         </form>
//         <p className="text-center">
//           <span className="text-span">Já possui conta? </span>
//           <Link className="text-link" to="/">
//             Conecte-se
//           </Link>
//         </p>
//       </LayoutForm>
//     </>
//   );
// };