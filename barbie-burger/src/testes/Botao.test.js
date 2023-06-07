import { render, fireEvent } from "@testing-library/react";
import Button from "../Componentes/Botão/Botao";
import React from "react";
import '@testing-library/jest-dom/extend-expect'; 

test('renderiza o componente Botao corretamente', () => {
  const onClickMock = jest.fn();

  const { getByText } = render(
    <Button onClick={onClickMock}>
      Clique aqui
    </Button>
  );

  const botao = getByText('Clique aqui');
  expect(botao).toBeInTheDocument();

  fireEvent.click(botao);
  expect(onClickMock).toHaveBeenCalledTimes(1);
});