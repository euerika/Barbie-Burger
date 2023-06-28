import "./HistoricoPedidos.css";
import { useEffect, useState } from "react";
import { OrdemPedido } from "../../Componentes/OrdemPedido/OrdemPedido";
import { OrdemProdutos } from "../../Componentes/OrdemProdutos/OrdemProdutos";
import { pegarPedidos } from "../../API/Cardapio";
import { Header } from "../../Componentes/Header/Header";
import { Sort } from "../../Ajudante/Sort";
import { statusVerificacao } from "../../Ajudante/StatusVerificacao";
import { calculationPreparationTime } from "../../Ajudante/PreparaçaoTime";
import { filterStatus } from "../../Ajudante"; 
import { formatTime } from "../../Ajudante/PreparaçaoTime";
import { getLocalStorageItem } from "../../API/ArmazenamentoLocal";

export const OrdersHistory =() => {
  const [orders, setOrders] = useState([]);

 
  useEffect (async() => {
    await pegarPedidos()    
    .then((response) => console.log(response.json()))
   
    .then((data) => {
      const sortOrders = Sort(data);
      const filterData = filterStatus(sortOrders,"delivered");
      setOrders(filterData);
    });
  }, []);

  return (
    <>
      <Header titlePage="Histórico" />
      <section className="orders-history-container">
        <div className="container-ul">
          <ul className="orders-container">
            {orders.map((item) => {
              return (
                <div key={item.id}>
                  <OrdemPedido
                  id={`order-${item.id}`}
                  clientName={item.client_name}
                  table={item.table}
                  status={statusVerificacao(item)}
                  status2={item.status}
                  createdAt={formatTime(item.createdAt)}
                  updatedAt={formatTime(item.updatedAt)}
                  processedAt={formatTime(item.processedAt)}
                  preparationTime={calculationPreparationTime(item.processedAt,item.createdAt)}
                  products={item.products.map((element) => {
                    return (
                      <div key={element.id}>
                        <OrdemProdutos
                        name={element.name}
                        qtd={element.qtd}
                        />
                      </div>
                    );
                  })}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};