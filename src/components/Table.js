import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = ({ target }) => {
    const { value } = target;
    const { dispatch } = this.props;
    dispatch(deleteExpense(value));
  };

  handleEdit = (element) => {
    const { dispatch } = this.props;
    dispatch(editExpense(element));
  };

  render() {
    const { expenses, editor } = this.props;
    return (
      <div>
        <table border="2">
          <thead>
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
          </thead>
          <tbody>
            {
              expenses
                .map(
                  (element) => (
                    <tr key={ element.id }>
                      <td>{element.description}</td>
                      <td>
                        { element.tag }
                      </td>
                      <td>{element.method}</td>
                      <td>
                        {element.exchangeRates[element.currency].name}
                      </td>
                      <td>
                        {parseFloat(
                          element.exchangeRates[element.currency].ask,
                        ).toFixed(2)}

                      </td>
                      <td>{parseFloat(element.value).toFixed(2)}</td>
                      <td>
                        {(Number(element.value) * Number(element
                          .exchangeRates[element.currency].ask)).toFixed(2)}
                      </td>
                      <td>Real</td>
                      <td>
                        <button
                          type="button"
                          data-testid="edit-btn"
                          value={ element.id }
                          onClick={ () => this.handleEdit(element) }
                          disabled={ editor }
                        >
                          editar
                        </button>
                        <button
                          type="button"
                          data-testid="delete-btn"
                          onClick={ this.handleRemove }
                          disabled={ editor }
                          value={ element.id }
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
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
  editor: globalState.wallet.editor,
});

export default connect(mapStateToProps)(Table);
