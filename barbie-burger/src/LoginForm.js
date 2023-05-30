import logo from './imagem/hamb.png';
import Barbie from './imagem/Barbie.png'
import Burgers from './imagem/Burgers.png'
import './Login.css';

function Login() {
  return (         
      <main className="Logo-header"> 
      <div className= "Forms" > 
      <form>
        <h2 className="texto-Login">Login</h2>
        <input className="input-Login" type='email' name='email' placeholder='E-mail'/><br />
        <input className="input-Login" type='password' name='password' placeholder='Senha'/><br />
        {/* <span className="Login">{error}</span> */}
        <button className="button-Entrar">Entrar</button>
        <div className="Cadastre-se">
            <p className="texto-cadastre">Não possui cadastro?</p>
            <button className="cadastre">Cadastre-se</button>
          </div>
        </form>
        </div>         
        <div className="Logo">
      <picture>           
        <img src={Barbie} className="nomeBarbie" alt="Logo Barbie"/>
        <img src={logo} className="hamburguer" alt="logo"/>
        <img src={Burgers} className="nomeBurgers" alt="Logo Burgers" />  
        </picture> 
        </div>            
      </main>   
  );
}
export default Login;
