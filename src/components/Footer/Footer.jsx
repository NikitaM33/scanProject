import React from 'react';

import logo from '../../assets/monologo.svg';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__container wrapper'>
        <div className="footer__logo">
          <img src={logo} alt="InfoScan" />
        </div>

        <div className="footer__info">
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@skan.ru</p>
          <p>Copyright. 2022</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
