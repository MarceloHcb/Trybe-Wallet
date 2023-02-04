import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    dispatch(deleteExpense(value));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>

        <table border="2">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir.</th>
          </tr>
          <tbody>
            {
              expenses
                .map(
                  ({ value, description, id, currency, tag, method, exchangeRates }) => (
                    <tr key={ id }>
                      <td>{description}</td>
                      <td>
                        { tag }
                      </td>
                      <td>{method}</td>
                      <td>
                        {exchangeRates[currency].name}
                      </td>
                      <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                      <td>{parseFloat(value).toFixed(2)}</td>
                      <td>
                        {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                      </td>
                      <td>Real</td>
                      <td>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          value={ id }
                          onClick={ this.handleRemove }
                        >
                          deletar
                        </button>
                      </td>

                    </tr>
                  ),
                )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
