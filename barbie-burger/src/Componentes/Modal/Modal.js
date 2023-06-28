import { Button } from "../../../src/Componentes/Botão/Botao"
import "./Modal.css";

export const Modal = ({children, click, onClickYes, onClickNo, modal}) => {
  return (
    <>
    {modal && (
    <div className="modal-container" onClick={click}>
      <div className="modal">
        <div className="modal-content">
          <p>{children}</p>
            <div className="modal-buttons">
              <Button className="button-yes button" onClick={onClickYes}>Sim</Button>
              <Button className="button-no button" onClick={onClickNo}>Não</Button>
            </div>
        </div>
      </div>
    </div>
    )}
  </>
  );
};