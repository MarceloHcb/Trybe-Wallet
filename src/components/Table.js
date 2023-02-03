import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div>
        <table border="1">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir.</th>
          </tr>
          <tr>
            <td>linha 1, célula 1</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
            <td>linha 1, célula 2</td>
          </tr>
          <tr>
            <td>linha 2, célula 1</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
            <td>linha 2, célula 2</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
