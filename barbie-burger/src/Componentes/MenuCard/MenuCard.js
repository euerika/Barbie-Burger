import "./MenuCard.css";

export const MenuCard = ({
  name,  
  image,
  price,
  children,
}) => {
  return (
    <div className="item">
      <div>
         <h3 className="item-name ">{name}</h3>
      </div> 
        <div className="imagem-valor">
           <img className="item-image" src={image} alt={name} />
           <div className="preco">
           <h4 className="item-price main-info">R${price},00</h4> 
           </div>                
       </div> 
      <div className="contador">
       {children}
      </div>   
    </div>
  );
};