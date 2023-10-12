import React from "react";
import { LogIn } from '../';

import authPeople from "../../assets/authmen.svg";

const Registration = () => {
  return (
    <div className="reg">
      <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
      <div className="reg__header">
        <div className="reg__banner">
          <img src={authPeople} alt="Reg people" />
        </div>
        <LogIn />
      </div>
    </div>
  )
};

export default Registration;
