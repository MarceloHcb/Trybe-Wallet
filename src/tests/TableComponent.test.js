import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

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
});
