// Coloque aqui suas actions
import { getCurrencies, getExchangeRates } from '../../tests/helpers/getCurrencies';

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
  const result = await getExchangeRates();
  console.log(result);

  dispatch({
    type: GET_EXPENSES,
    payload: {
      ...payload,
      exchangeRates: result,
    },
  });
};
