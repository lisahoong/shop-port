import React from 'react'
import { Link } from 'react-router';

const HomePage = () => (
  <div className='container'>
    <div className="txt-img">
      <img src="./images/landing.png" alt=""/>
    </div>
    <div className="home-banner">
      <h1>Shop and save together.<br/>
      <w>Never leave your cart behind again. #nocartsleftbehind
        <span>Invite friends to contribute to meet free shipping minimums, </span>
    <span>volume discounts, freebie requirements, etc.</span></w></h1>
    <button className="pay-button"><Link to="/select">Start shopping</Link></button>
  </div>
  </div>
);

export default HomePage
