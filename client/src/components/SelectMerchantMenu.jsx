import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';
import Auth from '../modules/Auth';


const SelectMerchantMenu = ({
  merchants, onClick, selected, products
}) => (
  <div>
    {console.log('auth = ', Auth.isUserAuthenticated())}
    {console.log('products are ', products)}

    <z>Select a merchant from the list below</z>
    <div>
      {merchants.map(function(merch, i) {
        return <div key={i}><button onClick={()=> onClick(merch)}>
          {merch.name}
        </button></div>
      })}
    </div>
  </div>
);


// SelectMerchantMenu.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

export default SelectMerchantMenu;
