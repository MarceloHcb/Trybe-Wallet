const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencies = async () => {
  const response = await fetch(`${CURRENCY_BASE_API}`);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
