import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const valueInput = 'value-input';
const descriptionInput = 'description-input';
const currencyInput = 'currency-input';
const methodInput = 'method-input';
const tagInput = 'tag-input';

describe('Testa as funcionalidades do componente WalletForm', () => {
  it('Verifica se os campos do form são renderizados', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByTestId(valueInput)).toBeInTheDocument();
    expect(screen.getByTestId(descriptionInput)).toBeInTheDocument();
    expect(screen.getByTestId(currencyInput)).toBeInTheDocument();
    expect(screen.getByTestId(methodInput)).toBeInTheDocument();
    expect(screen.getByTestId(tagInput)).toBeInTheDocument();
    expect(screen.getByTestId('add-btn')).toBeInTheDocument();

    expect(screen.getByTestId(valueInput).value).toBe('');
    expect(screen.getByTestId(descriptionInput).value).toBe('');
    expect(screen.getByTestId(methodInput).value).toBe('Dinheiro');
    expect(screen.getByTestId(tagInput).value).toBe('Alimentação');
  });
  it('Testa se adiciona uma despesa após clicar no botão', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    userEvent.type(screen.getByTestId(valueInput), '1');
    userEvent.type(screen.getByTestId(descriptionInput), 'despesa');
    userEvent.click(screen.getByTestId('add-btn'));
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /1\.00/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /despesa/i })).toBeInTheDocument();
    });
  });
  it('Ao clicar em editar o botão Adicionar deverá mudar para Editar', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(screen.getByTestId('add-btn')).toHaveTextContent('Adicionar despesa');
    userEvent.type(screen.getByTestId(valueInput), '2');
    userEvent.type(screen.getByTestId(descriptionInput), 'despesa');
    userEvent.type(screen.getByTestId(currencyInput), 'USD');
    userEvent.selectOptions(screen.getByTestId(methodInput), 'Dinheiro');
    userEvent.selectOptions(screen.getByTestId(tagInput), 'Trabalho');

    userEvent.click(screen.getByTestId('add-btn'));

    expect(screen.getByTestId('add-btn')).toHaveTextContent('Adicionar despesa');

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /editar/i }));
    });
    await waitFor(() => {
      expect(screen.getByTestId('add-btn')).toHaveTextContent('Editar despesa');
      expect(screen.getByTestId('value-input')).toHaveValue(2);
      expect(screen.getByTestId(descriptionInput)).toHaveValue('despesa');
      expect(screen.getByTestId(currencyInput)).toHaveValue('USD');
      expect(screen.getByTestId(methodInput)).toHaveValue('Dinheiro');
      expect(screen.getByTestId(tagInput)).toHaveValue('Trabalho');
    });
  });
  it('Testa se ao entrar no Form a requisição dos correncies já foi feita', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    await waitFor(() => {
      const { currencies } = store.getState().wallet;
      expect(currencies).toHaveLength(15);
    });
  });
  it('Testa se a requisição expenses é feita ao clicar no botão', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    userEvent.type(screen.getByTestId(valueInput), '3');
    userEvent.type(screen.getByTestId(descriptionInput), 'despesa');
    userEvent.click(screen.getByTestId('add-btn'));

    await waitFor(() => {
      const { expenses } = store.getState().wallet;
      expect(expenses).toHaveLength(1);
    });
  });
  it('Testa se é possivel adicionar 2 itens de despesa', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    userEvent.type(screen.getByTestId(valueInput), '1');
    userEvent.type(screen.getByTestId(descriptionInput), 'despesa1');
    userEvent.click(screen.getByTestId('add-btn'));
    userEvent.type(screen.getByTestId(valueInput), '2');
    userEvent.type(screen.getByTestId(descriptionInput), 'despesa2');
    userEvent.click(screen.getByTestId('add-btn'));

    await waitFor(() => {
      const { expenses } = store.getState().wallet;
      expect(expenses).toHaveLength(2);
    });
  });
  it('', () => {

  });
});
