import "./Header.css";

import { getRole, getLocalStorageItem, removeRole, removeLocalStorageItem } from "../../API/ArmazenamentoLocal";
import { useNavigate } from "react-router-dom";
import Barbie from "../../../src/imagem/LogoMenu.png";
 
//import IconeSair from "../../../src/imagem/IconeSair.svg"
import { BiExit } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";

export const Header = ({ tituloPagina }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    if( getLocalStorageItem){
      removeLocalStorageItem();
      removeRole();
      return navigate("/");
    }
  };

  const handleHome = () => {
    if(getRole() === "atendente") {
      navigate("/menu");
    } else if(getRole() === "kitchen") {
      navigate("/kitchen");
    }
  };

  const handleHistory = () => navigate("/OrdemPedido");

  const handleDelivery = () => navigate("/OrdemDelivery");



  return (
    <header className="header">
      <picture className="logo">
         <img className="logo-burger" src={Barbie} />        
      </picture>
      {/* <IoMdExit/> */}
      <h1 className="header-title">{tituloPagina}</h1>
      <div className="buttons-container">
      <button className="button-header" onClick={handleHistory}>
           <BsCardChecklist/>
            {/* <img className="img-button-header" src={History} /> */}
          </button>
        <button className="button-header" onClick={handleLogout}>
          <BiExit/>
          {/* <img className="img-button-header" src={IoMdExit} />   */}
        </button>
        <div className="container-button-history-delivery">
          <button className="button-header" onClick={handleHome}>
            {/* <img className="img-button-header" src={Home} />  */}
          </button>
          {getRole() === "atendente" ?
          <button className="button-header" onClick={handleDelivery}>
            {/* <img className="img-button-header" src={Delivery} /> */}
          </button> : "" }
          
        </div>
      </div>
    </header>
  );
};
export default Header;