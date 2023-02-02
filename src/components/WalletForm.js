import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrency());
  }

  render() {
    console.log(this.props);
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form>
        <label htmlFor="inputValue">
          <input type="number" id="inputValue" data-testid="value-input" />
        </label>
        <label htmlFor="inputDescription">
          <input type="text" id="inputDescription" data-testid="description-input" />
        </label>
        <select data-testid="currency-input">
          {currencies.map((currency, index) => (
            <option value={ currency } key={ index }>{currency}</option>
          ))}
        </select>

        <select data-testid="method-input">
          <option value="Dinheiro">Dinheiro </option>
          <option value="Cartão de crédito">Cartão de crédito </option>
          <option value="Cartão de débito">Cartão de débito </option>
        </select>

        <select data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

      </form>

    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
