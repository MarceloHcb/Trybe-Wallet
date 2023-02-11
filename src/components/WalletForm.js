import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDone, getCurrency, getExpenses } from '../redux/actions';

class WalletForm extends Component {
  INITIAL_STATE = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  state = {
    ...this.INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrency());
  }

  componentDidUpdate() {
    const { editor, editedExpense } = this.props;
    const { id } = this.state;

    if (editor && id !== editedExpense.id) {
      this.setState({
        ...editedExpense,
      });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(getExpenses({ ...this.state }));
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  };

  handleEdit = () => {
    const { dispatch } = this.props;

    dispatch(editDone(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency } = this.state;

    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="inputValue">
          Valor
          <input
            type="number"
            id="inputValue"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputDescription">
          Descrição
          <input
            type="text"
            name="description"
            value={ description }
            id="inputDescription"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((currencyy, index) => (
            <option value={ currencyy } key={ index }>{currencyy}</option>
          ))}
        </select>
        <select data-testid="method-input" name="method" onChange={ this.handleChange }>
          {
            method.map((metho, index) => (
              <option
                value={ metho }
                key={ index }
              >
                {metho}
              </option>
            ))
          }
        </select>
        <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
          {tag.map((tagOptions) => (
            <option value={ tagOptions } key={ tagOptions }>{tagOptions}</option>
          ))}
        </select>
        <button
          data-testid="add-btn"
          type="button"
          onClick={ editor ? this.handleEdit : this.handleClick }
        >

          { editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  editedExpense: PropTypes.shape({
    id: PropTypes.string,
  }),
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
  }).isRequired,
  idToEdit: PropTypes.any,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  editedExpense: globalState.wallet.editedExpense,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
