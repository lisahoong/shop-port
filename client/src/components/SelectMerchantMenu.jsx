import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';
import Auth from '../modules/Auth';

function generateLink(param) {
  var sParameter = encodeURIComponent(param.trim())
  return `/shop/${sParameter}`;
}


const SelectMerchantMenu = ({
  merchants, onClick, selected, products
}) => (
  <div>
    {console.log('auth = ', Auth.isUserAuthenticated())}


    <z>Select a merchant from the list below</z>
    <div>
      {merchants.map(function(merch, i) {
        return <div key={i}>
        <div><Link to={generateLink(merch.name)} id="nav-link" >{merch.name}</Link></div>
        </div>
      })}
    </div>
  </div>
);


// SelectMerchantMenu.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default SelectMerchantMenu;
