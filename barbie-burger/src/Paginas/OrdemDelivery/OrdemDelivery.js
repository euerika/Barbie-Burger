import "./OrdemDelivery.css";
import { useEffect, useState } from "react";
import { OrdemPedido } from "../../Componentes/OrdemPedido/OrdemPedido";
import { OrdemProdutos } from "../../Componentes/OrdemProdutos/OrdemProdutos";
import { pegarProdutos, atualizarPedidos } from "../../API/Cardapio";
import { Header } from "../../Componentes/Header/Header";
import { Button } from "../../Componentes/Botão/Botao";
import { Sort } from "../../Ajudante/Sort";
import { statusVerificacao } from "../../Ajudante/StatusVerificacao";
import {  calculationPreparationTime} from "../../Ajudante/PreparaçaoTime";
import { filterStatus } from "../../Ajudante"; 
import { formatTime } from "../../Ajudante/PreparaçaoTime";
//import { getRole } from "../../API/ArmazenamentoLocal";
import { useNavigate } from "react-router-dom";

export const OrdemDelivery = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    pegarProdutos()
      .then((response) => response.json())
      .then((data) => {
        const sortOrders = Sort(data);
        const filterData = filterStatus(sortOrders, "ready");
        setOrders(filterData);
      });
  }, []);

  const orderStatus = (item, e) => {
    atualizarPedidos(item.id, e.target.value).then((response) => {
      let copyOrders = orders;
      if (response.status === 200) {
        copyOrders = orders.map((copyOrder) => {
          if (copyOrder.id === item.id) {
            copyOrder.status = e.target.value;
            copyOrder.updatedAt = new Date();
            copyOrder.processedAt = new Date();
          }
          return copyOrder;
        });
        const filterOnChangeStatus = filterStatus(copyOrders, "ready");
        setOrders(filterOnChangeStatus);
      }
    });
  };

  return (
    // <>
    //   {getRole() === "saloon" ? (
        <>
          <Header titlePage="Pedidos Prontos" />
          <section className="orders-delivery-container">
            <div className="container-ul">
              <ul className="orders-container">
                {orders.map((item) => {
                  return (
                    <div key={item.id}>
                      <OrdemPedido
                        id={item.id}
                        clientName={item.client_name}
                        table={item.table}
                        status={statusVerificacao(item)}
                        status2={item.status}
                        createdAt={formatTime(item.createdAt)}
                        updatedAt={formatTime(item.updatedAt)}
                        processedAt={formatTime(item.processedAt)}
                        preparationTime={calculationPreparationTime(
                          item.processedAt,
                          item.createdAt
                        )}
                        products={item.Products.map((element) => {
                          return (
                            <div key={element.id}>
                              <OrdemProdutos
                                name={element.name}
                                flavor={element.flavor}
                                complement={element.complement}
                                qtd={element.qtd}
                              />
                            </div>
                          );
                        })}
                      >
                        <Button
                          onClick={(e) => orderStatus(item, e)}
                          value="delivered"
                        >
                          Entregar
                        </Button>
                      </OrdemPedido>
                    </div>
                  );
                })}
              </ul>
            </div>
          </section>
        </>
    //   ) : (
    //     navigate("/kitchen")
    //   )}
    // </>
  );
};