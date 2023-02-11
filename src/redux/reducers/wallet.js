import { DELETE_EXPENSE, GET_CURRENCY,
  GET_EXPENSES, EDIT_EXPENSE, EDIT_DONE } from '../actions';
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
      exchangeRates: action.exchangeRates,
      editor: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== Number(action.payload)),
      idToEdit: state.expenses.length,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      editedExpense: action.payload,
    };
  case EDIT_DONE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      editor: false,
    };

  default:
    return state;
  }
};
