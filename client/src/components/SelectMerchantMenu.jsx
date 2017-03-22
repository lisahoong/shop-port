import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';

const SelectMerchantMenu = ({
  onSubmit,
}) => (
  <z>Select a merchant from the list below</z>
);

SelectMerchantMenu.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SelectMerchantMenu;
