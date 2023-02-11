import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('', () => {
  it('Testa o valor total das despesas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const total = screen.queryByTestId(/total-field/i);
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
  });
  it('Verifica se o câmbio "BRL" são exibidos na tela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const cambio = screen.getByRole('heading', { name: /brl/i });
    expect(cambio).toBeInTheDocument();
  });
  it('Verifica se após logar email é exibido no componente Header', () => {
    const emailTest = 'mclo@mclo.com';
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, emailTest);
    userEvent.type(passInput, 'nixu123456');
    userEvent.click(button);
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toHaveTextContent('mclo@mclo.com');
  });
});
