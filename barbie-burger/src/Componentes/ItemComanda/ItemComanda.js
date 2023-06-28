import "./ItemComanda.css";
//import TrashCan from "../../assets/trash_can.svg";

export const ItemComanda = ({
  qtd,
  name,
  flavor,
  complement,
  price,
  children,
  onClickDelete,
  totalPriceItem,
}) => {
  return (
    <li className="item-list">
      <div className="item-detail">
        <p>
          {qtd} x <span> {name}</span> <span>R${price},00</span>
        </p>
        <p>R${totalPriceItem},00</p>
      </div>
         <div className="item-detail">
        {children}
        <button className="trash-can" onClick={onClickDelete}>
          {/* <img src={TrashCan} /> */}
        </button>
      </div>
    </li>
  );
};