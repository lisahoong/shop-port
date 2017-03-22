import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Dropdown from 'react-dropdown';



const SelectMerchantMenu = ({
  merchants, onClick
}) => (
  <div>
    {console.log('loading: ', merchants)}

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
