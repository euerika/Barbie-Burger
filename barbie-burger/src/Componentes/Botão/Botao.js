import "../../../src/Componentes/Botão/Botao.css";

export const Button = ({
  children,
  onClick,
  classNameContainer = "button-container",
  className = "button",
  ...props
}) => {
  return (
    <div className={classNameContainer}>
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    </div>
  );
};

export const ButtonMenu = ({
  children,
  onClick,
  classNameContainer = "button-container",
  className = "button-menu",
  ...props
}) => {
  return (
    <div className={classNameContainer}>
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    </div>
  );
};

