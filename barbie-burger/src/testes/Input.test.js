import { render, screen, fireEvent } from "@testing-library/react";
import { CampoTexto } from "../Componentes/Input/Input";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect'; 

describe("Input", () => {
    it("se está renderizando corretamente o componente", () => {
      const aoAlteradoMock = jest.fn();
  
      render(
         <MemoryRouter>
             <CampoTexto onChange={aoAlteradoMock} label={'label'} />
         </MemoryRouter>);
      
      const elementoCampo = screen.getByRole('textbox');
  
      fireEvent.input(elementoCampo, { target: { value: 'texto'} });
  
      expect(aoAlteradoMock).toHaveBeenCalledTimes(1);
      // expect(aoAlteradoMock).toHaveBeenCalledWith('valor de teste');
    });
    
  });