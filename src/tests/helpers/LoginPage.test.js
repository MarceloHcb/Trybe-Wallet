import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from './renderWith';

beforeEach(() => {
  renderWithRouterAndRedux(<Login />);
});
describe('Testa a tela de login', () => {
  it('Testa se a rota do component login é "/" ', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se na tela de login passui um input de email', () => {
    const inputEmail = screen.getByRole('textbox', { name: /email:/i });
    expect(inputEmail).toBeInTheDocument();
  });
  it('Testa se na tela de login possui um input de senha', () => {
    const passInput = screen.getByTestId('password-input');
    expect(passInput).toBeInTheDocument();
  });
  it('Testa se o botão Entrar só é habilitado após receber os parâmetros corretos de login e senha ', () => {
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
    const inputEmail = screen.getByRole('textbox', { name: /email:/i });
    const passInput = screen.getByTestId('password-input');
    userEvent.type(inputEmail, 'nixube@mailinator.com');
    userEvent.type(passInput, 'nixu123456');
    expect(button).not.toBeDisabled();
  });
});
