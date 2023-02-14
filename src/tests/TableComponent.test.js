import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const valueInput = 'value-input';
describe('Testa se os dados renderizam corretamente no componente Table ', () => {
  it('Verifica a tabela é renderizada', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
  it('Verifica se os campos da tabela são renderizados', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    expect(screen.getByRole('spinbutton', { name: /valor/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /tag/i })).toBeInTheDocument();
  });
  it('Verifica se o estado Global é atualizado ao clicar em deletar uma despesa', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const addButton = screen.getByTestId('add-btn');
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);
    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      const editButton = screen.getByTestId('edit-btn');
      const delectButton = screen.getByTestId('delete-btn');
      expect(editButton).toBeInTheDocument();
      expect(delectButton).toBeInTheDocument();
      userEvent.click(delectButton);
      expect(store.getState().wallet.expenses).toHaveLength(0);
    });
  });
  it('Verifica se ao clicar em editar a despesa se torna editável nos campos', async () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const addButton = screen.getByTestId('add-btn');
    expect(addButton).toBeInTheDocument();
    userEvent.type(screen.getByTestId(valueInput), '50');
    userEvent.click(addButton);
    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      const editButton = screen.getByTestId('edit-btn');
      const delectButton = screen.getByTestId('delete-btn');
      expect(screen.getByRole('cell', { name: /50\.00/i })).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
      expect(delectButton).toBeInTheDocument();
      userEvent.click(editButton);
      expect(screen.getByRole('spinbutton', { name: /valor/i })).toHaveValue(50);
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(store.getState().wallet.idToEdit).toEqual(0);
      expect(store.getState().wallet.editedExpense.id).toEqual(0);
      expect(screen.getByText(/editar despesa/i)).toBeInTheDocument();
    });
  });
  it('', () => {

  });
});
