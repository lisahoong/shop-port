import React { PropTypes } from 'react';
import { Link } from 'react-router';

const Products = ({items}) => (
  <div className="clothes-container">
    {items.map(function(item) {
      return (
        <div className="clothing-item-container">
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
)
