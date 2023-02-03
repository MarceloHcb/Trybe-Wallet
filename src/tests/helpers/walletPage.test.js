import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testa a página da carteira', () => {
  it('Testa se a página da carteira corresponde a rota "/carteira"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const walletButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(walletButton).toBeInTheDocument();
  });
  it('Verifica se o component Header renderiza dentro do compontente da carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const loginEmail = screen.getByTestId('email-field');
    expect(loginEmail).toBeInTheDocument();
  });
  it('Verifica se input para adicionar o valor está na página da carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
  });
//   it('verifica se ao adicionar uma despesa o valor total no componente Header é atualizado corretamente', () => {
//     renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
//     const inputValue = screen.getByTestId('value-input');
//     const button = screen.getByRole('button', { name: /adicionar despesa/i });
//     const totalValue = screen.getByTestId('total-field')
//     userEvent.type(inputValue, '5');
//     userEvent.click(button)
//     console.log('total value',totalValue.innerHTML);
//     expect(totalValue.innerText).toHaveValue('25.72')
//   });
});
