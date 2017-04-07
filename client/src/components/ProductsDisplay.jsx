import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProductsDisplay = function({data, items, showInfo}) {
  return (<div className="flex-four">
      <div className="clothes-container">
        {items.map(function(item, i) {
          return (
            <div key={i} onClick={() => showInfo(item)} className="clothing-item-container">
              <div>
              <img className="clothing-item-image" href={item.link} src={item.src}/>
              <a className="clothing-item-info" href={item.link}>{item.title}</a>
              <p className="clothing-item-price">{item.price}</p>
              </div>
          </div>
          )
        })
      }
      </div>
  </div>)
}

export default ProductsDisplay;
