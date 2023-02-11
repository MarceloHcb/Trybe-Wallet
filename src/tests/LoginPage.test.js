import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const password = 'password-input';
const email = 'email-input';

describe('Testa a tela de login', () => {
  it('Testa se a rota do component login é "/" ', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se na tela de login passui um input de email', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByTestId(email);
    expect(inputEmail).toBeInTheDocument();
  });
  it('Testa se na tela de login possui um input de senha', () => {
    renderWithRouterAndRedux(<Login />);
    const passInput = screen.getByTestId(password);
    expect(passInput).toBeInTheDocument();
  });
  it('Testa se o botão Entrar só é habilitado após receber os parâmetros corretos de login e senha ', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
    const inputEmail = screen.getByTestId(email);
    const passInput = screen.getByTestId(password);
    userEvent.type(inputEmail, 'nixube@mailinator.com');
    userEvent.type(passInput, 'nixu123456');
    expect(button).not.toBeDisabled();
  });
  it('Testa se redireciona para rota "/carteira após login e se salva email no estado Global', async () => {
    const emailTest = 'mclo@mclo.com';
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const passInput = screen.getByTestId(password);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, emailTest);
    userEvent.type(passInput, 'nixu123456');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(emailTest);
  });
});
