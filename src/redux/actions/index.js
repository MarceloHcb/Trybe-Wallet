// Coloque aqui suas actions
import getCurrencies from '../../tests/helpers/getCurrencies';

export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export const saveUserInfo = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const GET_CURRENCY = 'GET_CURRENCY';

export const getCurrency = () => async (dispatch) => {
  const result = await getCurrencies();
  console.log(result);
  dispatch({
    type: GET_CURRENCY,
    payload: {
      currencies: Object.keys(result).filter((keys) => keys !== 'USDT'),
    },
  });
};
