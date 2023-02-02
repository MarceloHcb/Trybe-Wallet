import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = ({
    email: '',
    password: '',
    isValid: false,
  });

  formValidation = () => {
    const { email, password } = this.state;
    const maxPasswordNumber = 6;
    const passwordValidation = password.length >= maxPasswordNumber;
    const emailValidation = email.length > 0
    && email.includes('@') && email.includes('.com');
    this.setState({
      isValid: (emailValidation && passwordValidation),
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.formValidation());
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(saveUserInfo({ ...this.state }));
    history.push('/carteira');
  };

  render() {
    const { isValid } = this.state;
    return (
      <form>
        <label htmlFor="inputEmail">
          Email:
          <input
            type="text"
            id="inputEmail"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <br />
        <label htmlFor="inputPassword">
          Senha:
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !isValid }
          onClick={ this.handleClick }
        >
          Entrar

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
