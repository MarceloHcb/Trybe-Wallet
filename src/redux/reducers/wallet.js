import { GET_CURRENCY, GET_EXPENSES } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  // erroDataCurrencies: '',
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: [...action.payload.currencies],
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      idToEdit: action.payload.id,
      exchangeRates: action.exchangeRates,

    };
  default:
    return state;
  }
};
