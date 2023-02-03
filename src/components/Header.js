import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email, expenses } = props;

  console.log(expenses);

  const total = expenses.reduce((acc, cur) => {
    const exchange = cur.exchangeRates[cur.currency].ask;
    // console.log(exchange);
    return acc + (Number(cur.value) * exchange);
  }, 0);
  console.log(total);
  return (
    <div>
      <h2 data-testid="email-field">
        {' '}
        { email }
      </h2>
      <h2 data-testid="total-field">{total.toFixed(2)}</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
