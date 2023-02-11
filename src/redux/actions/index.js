// Coloque aqui suas actions
import { getCurrencies } from '../../tests/helpers/getCurrencies';

export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export const saveUserInfo = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const GET_CURRENCY = 'GET_CURRENCY';

export const getCurrency = () => async (dispatch) => {
  const result = await getCurrencies();
  dispatch({
    type: GET_CURRENCY,
    payload: {
      currencies: Object.keys(result).filter((keys) => keys !== 'USDT'),
    },
  });
};

export const GET_EXPENSES = 'GET_EXPENSES';

export const getExpenses = (payload) => async (dispatch) => {
  const result = await getCurrencies();

  dispatch({
    type: GET_EXPENSES,
    payload: {
      ...payload,
      exchangeRates: result,
    },
  });
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const EDIT_DONE = 'EDIT_DONE';

export const editDone = (payload) => ({
  type: EDIT_DONE,
  payload,
});
