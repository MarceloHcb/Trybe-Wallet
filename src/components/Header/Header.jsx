import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email } = props;
  console.log(email);
  return (
    <div>
      <h2 data-testid="email-field">
        {' '}
        { email }
      </h2>
      <h2 data-testid="total-field">0</h2>
      <h2 data-testid="header-currency-field">BRL</h2>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Header);
