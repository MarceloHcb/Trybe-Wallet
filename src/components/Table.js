import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>

        <table border="1">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir.</th>
          </tr>
          {
            expenses
              .map(({ value, description, id, currency, tag, method, exchangeRates }) => (
                <tbody key={ id }>
                  <tr>
                    <td>{description}</td>
                    <td>
                      {' '}
                      { tag }
                    </td>
                    <td>{method}</td>
                    <td>
                      {exchangeRates[currency].name}
                    </td>
                    <td>{value}</td>
                    <td>{exchangeRates[currency].ask}</td>
                    <td>
                      {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td />
                  </tr>
                </tbody>
              ))
          }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
