import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa se os dados renderizam corretamente no componente Table ', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  it('Verifica se o campo moeda é renderizado ', async () => {
    const valueInput = screen.getByTestId('value-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const total = screen.getByTestId('total-field');
    userEvent.type(valueInput, '50');
    userEvent.click(button);

    await waitFor(() => expect(total.innerHTML).toBe('257.63'));
  });
});
