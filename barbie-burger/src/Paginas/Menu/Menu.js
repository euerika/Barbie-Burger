import { useEffect, useState } from "react";
import { Button, ButtonMenu } from "../../Componentes/Botão/Botao";
import { MenuCard } from "../../Componentes/MenuCard/MenuCard";
import { criarPedidos, pegarProdutos } from "../../API/Cardapio";
import { BotaoContador } from "../../Componentes/BotaoContador/BotaoContador";
import { ItemComanda } from "../../Componentes/ItemComanda/ItemComanda";
import { Header } from "../../Componentes/Header/Header";
import { CampotextoMenu } from "../../Componentes/Input/Input";
import { ErrorMessage } from "../../Componentes/ErrorMenssage/ErrorMessage";
import { CriarOrdemErro } from "../../API/Erro";
import { filterType } from "../../Ajudante/Filtro";
import { filterCategory } from "../../Ajudante/Filtro";
import { OcultarMsg } from"../../Ajudante/OcultarMsg";
import { Modal } from "../../Componentes/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "../../API/ArmazenamentoLocal";
import { getRole } from "../../API/ArmazenamentoLocal"
import './Menu.css';

function Menu() {
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState([]);
  const [changeColor, setChangeColor] = useState("breakfast");
  const [allDayMenu, setAllDayMenu] = useState([]);
  const [breakfastMenu, setBreakfastMenu] = useState([]);
  const [acompanhamentoMenu, setAcompanhamentoMenu] = useState([]);
  const [bebidasMenu, setABebidasMenu] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState([]);
  const [client, setClient] = useState("");
  const [table, setTable] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); 
  const [modal, setModal] = useState(false);
  const [modalSendOrder, setModalSendOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const authToken = getLocalStorageItem('token');
      const response = await pegarProdutos(authToken);
      const listaProdutos = await response.json()       
      
      .then((fetchData) => {       
        const filtrarCafeManha = filterType(fetchData, "Desjejum");
        setBreakfastMenu(filtrarCafeManha);

        const hamburguer = filterCategory(fetchData, "lanche");
        setAllDayMenu(hamburguer);

        const acompanhamento = filterCategory(fetchData, "acompanhamento");
        setAcompanhamentoMenu(acompanhamento);
       
        const bebidas = filterCategory(fetchData, "bebida");
        setABebidasMenu(bebidas);
        console.log(bebidas)
       // setMenu(listaProdutos);        
      })          
    }
    fetchData();    
  }, []);
  
  const handleClickMenu = (e) => {
    setChangeColor(e.target.value);
    e.target.value === "breakfast"       
      ? setMenu(breakfastMenu)
      : setMenu(allDayMenu);       
  };     
  const handleClickAcompanhamento = (e) => {
    setChangeColor(e.target.value);
    e.target.value === "acompanhamento" 
        
      ? setMenu(acompanhamentoMenu)
      : setMenu(bebidasMenu);
  };


  const increaseCount = (item) => {
    const countElement = order.find((element) => element.id === item.id);

    if (countElement) {
      countElement.qtd += 1;
    } else {
      item.qtd = 1;
      order.push(item);
    }
    setOrder([...order]);
  };

  const decreaseCount = (item) => {
    const countElement = order.find((element) => element.id === item.id);

    if (countElement) {
      if (countElement.qtd === 1) {
        order.splice(
          order.findIndex((element) => element.id === item.id),
          1
        );
        countElement.qtd = 0;
      }
      if (countElement.qtd > 1) {
        countElement.qtd -= 1;
      }
    }
    setOrder([...order]);
  };

  const getItemCount = (item) => {
    const findItem = order.find((element) => element.id === item.id);
    return findItem ? findItem.qtd : 0;
  };

  const deleteItem = (item) => {
    order.splice(
      order.findIndex((element) => element.id === item.id),
      1
    );
    setOrder([...order]);
  };

  useEffect(() => {
    const totalOrder = order.reduce((previousValue, item) => {
      return previousValue + item.qtd * item.price;
    }, 0);
    setTotalPrice(totalOrder);
  }, [order]);

  const sendOrder = async () => {
    await criarPedidos(client, table, order)
      .then((response) => response.json())
      .then(json => console.log(json))
      // console.log("response", response)
        // if (response.status === 200) {
        //   setOrder([]);
        //   setTable("");
        //   setClient("");
          
        //   return response.json();
        // }
        // setErrorMessage(CriarOrdemErro(response));
      // })
      .catch(() => setErrorMessage(CriarOrdemErro({ status: 500 })));
    OcultarMsg(setErrorMessage);
    console.log(criarPedidos)
  };

  return (        
        <>
          <Header titlePage="Cardápio" />
          <div className="container-main">
            <section className="menu-section">
              <div className="container-button">
                <Button
                  className="button-menu button"
                  classNameContainer="button-container-right button-container "
                  value="breakfast"
                  onClick={handleClickMenu}
                  style={{
                    backgroundColor:
                      changeColor === "breakfast" ? "#ED5C9B" : "#F18DBC",
                  }}
                >
                  Café da Manhã
                </Button>
                <Button
                  className="button-menu button"
                  classNameContainer="button-container-left button-container"
                  value="hamburguer"
                  onClick={handleClickMenu}
                  style={{
                    backgroundColor:
                      changeColor === "hamburguer" ? "#ED5C9B" : "#F18DBC",
                  }}
                >
                  Hamburguer
                </Button>
                <Button
                  className="button-menu button"
                  classNameContainer="button-container-left button-container"
                  value="acompanhamento"
                  onClick={handleClickAcompanhamento}
                  style={{
                    backgroundColor:
                      changeColor === "acompanhamento" ? "#ED5C9B" : "#F18DBC",
                  }}
                >
                  Acompanhamento
                </Button>
                <Button
                  className="button-menu button"
                  classNameContainer="button-container-left button-container"
                  value="bebidas"
                  onClick={handleClickAcompanhamento}
                  style={{
                    backgroundColor:
                      changeColor === "bebidas" ? "#ED5C9B" : "#F18DBC",
                  }}
                >
                  Bebidas
                </Button>
              </div>
              <div className="container-menu">
                <ul className="container-products">
                  {menu.map((item) => {
                    return (
                      <div key={`order-${item.id}`}>
                        <MenuCard
                          image={item.image}
                          name={item.name}
                          price={item.price}
                        >
                          <BotaoContador
                            amount={getItemCount(item)}
                            increase={() => increaseCount(item)}
                            decrease={() => decreaseCount(item)}
                          />
                        </MenuCard>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </section>
            <aside className="order-aside">
              <section className="order-section">
                <h2 className="order-title">Pedido</h2>
                <div className="inputs-order">
                  <div className="input-client">
                    <CampotextoMenu
                      type="text"                    
                      value={client}
                      name="input-menu"
                      placeholder="Nome"
                      autoComplete="off"
                      onChange={(e) => setClient(e.target.value)}
                    />
                  </div>
                  <div className="input-table">
                    <CampotextoMenu
                      type="number"
                       min="1"                      
                      value={table}
                      name="input-menu"
                      placeholder="Mesa"
                      autoComplete="off"
                      onChange={(e) => setTable(e.target.value)}
                    />
                  </div>
                </div>
                <ul className="items-container">
                  {order.map((item) => {
                    return (
                      <div className="item-map" key={`order-${item.id}`}>
                        <ItemComanda
                          qtd={item.qtd}
                          name={item.name}
                          price={item.price}
                         
                          totalPriceItem={item.price * item.qtd}
                          onClickDelete={() =>
                            setModal((previous) => !previous)
                          }
                        >
                         
                        </ItemComanda>
                      </div>
                    );
                  })}
                </ul>
                <div className="total-order-container">
                  <p className="total-order">
                    <span>Total</span>
                    <span>R${totalPrice},00</span>
                  </p>
                  <ErrorMessage
                    disable={errorMessage ? false : true}
                    message={errorMessage}
                  />
                  </div>
                  <div>
                  <ButtonMenu
                    onClick={() => setModalSendOrder((previous) => !previous)}
                  >
                    Finalizar Pedido
                  </ButtonMenu>
                </div>
              </section>
            </aside>
            <Modal
              modal={modal}
              click={() => setModal(false)}
              onClickYes={deleteItem}
              onClickNo={() => setModal(false)}
            >
              Você tem certeza que deseja excluir o produto?
            </Modal>
            <Modal
              modal={modalSendOrder}
              click={() => setModalSendOrder(false)}
              onClickYes={sendOrder}
              onClickNo={() => setModalSendOrder(false)}
            >
              Deseja finalizar o pedido?
            </Modal>
          </div>
         </>
      
  );
}
export default Menu;