import "./Cozinha.css";
import { useEffect, useState } from "react";
import { OrdemPedido } from "../../Componentes/OrdemPedido/OrdemPedido";
import { OrdemProdutos } from "../../Componentes/OrdemProdutos/OrdemProdutos";//ok
import { pegarPedidos, atualizarPedidos } from "../../API/Cardapio";//ok
import { Header } from "../../Componentes/Header/Header";//ok
import { Button } from "../../Componentes/Botão/Botao";//ok
import { calculationPreparationTime, formatTime } from "../../Ajudante/PreparaçaoTime";
import { filterStatus} from "../../Ajudante/Filtro";
import { sortData } from "../../Ajudante/Sort";
import { statusVerification } from "../../../src/Ajudante/StatusVerificacao";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../API/ArmazenamentoLocal";

export const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    pegarPedidos()
      .then((response) => response.json())
      .then((data) => {
        const sortDataKitchen = sortData(data);
        const filterData = filterStatus(
          sortDataKitchen,
          "pending",
          "preparing"
        );
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
        const filterOnChangeStatus = filterStatus(
          copyOrders,
          "pending",
          "preparing"
        );
        setOrders(filterOnChangeStatus);
      }
    });
  };

  return (
    <>
      {getRole() === "kitchen" ? (
        <>
          <Header titlePage="Cozinha" />
          <section className="kitchen-container">
            <div className="container-ul">
              <ul className="orders-container">
                {orders.map((item) => {
                  return (
                    <div key={item.id}>
                      <OrdemPedido
                        id={item.id}
                        clientName={item.client_name}
                        table={item.table}
                        status={statusVerification(item)}
                        createdAt={formatTime(item.createdAt)}
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
                        {item.status === "pending" ? (
                          <Button
                            onClick={(e) => orderStatus(item, e)}
                            value="preparing"
                          >
                            Preparar
                          </Button>
                        ) : (
                          item.status === "preparing" && (
                            <Button
                              onClick={(e) => orderStatus(item, e)}
                              value="ready"
                            >
                              Pronto
                            </Button>
                          )
                        )}
                      </OrdemPedido>
                    </div>
                  );
                })}
              </ul>
            </div>
          </section>
        </>
      ) : (
        navigate("/menu")
      )}
    </>
  );
};