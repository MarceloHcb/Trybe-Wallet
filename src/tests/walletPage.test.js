import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const valueInput = 'value-input';
const descriptionInput = 'description-input';
const currencyInput = 'currency-input';
const methodInput = 'method-input';
const tagInput = 'tag-input';

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
    const inputValue = screen.getByTestId(valueInput);
    expect(inputValue).toBeInTheDocument();
  });
  it('verifica se ao adicionar uma despesa o valor total no componente Header é atualizado corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputValue = screen.getByTestId(valueInput);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const totalValue = screen.getByTestId('total-field');
    userEvent.type(inputValue, '5');
    userEvent.click(button);
    await waitFor(() => expect(Number(totalValue.innerHTML)).toBeGreaterThan(5));
  });
  it('Testa o envio de dados para estado Global', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    userEvent.type(screen.getByTestId(valueInput), '3');
    userEvent.type(screen.getByTestId(descriptionInput), 'despesa');
    userEvent.type(screen.getByTestId(currencyInput), 'USD');
    userEvent.type(screen.getByTestId(methodInput), 'Dinheiro');
    userEvent.type(screen.getByTestId(tagInput), 'Alimentação');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);
    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(store.getState().wallet.expenses[0].value).toBe('3');
      expect(store.getState().wallet.expenses[0].currency).toBe('USD');
      expect(store.getState().wallet.expenses[0].method).toBe('Dinheiro');
      expect(store.getState().wallet.expenses[0].tag).toBe('Alimentação');
      expect(store.getState().wallet.expenses.editor).toBeFalsy();
    });
  });
});
