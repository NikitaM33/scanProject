import React from 'react';
import { useSelector } from "react-redux";
import cn from 'classnames';

import bulb from "../../assets/bulb.svg";
import laptop from "../../assets/laptop.svg";
import target from "../../assets/target.svg";
import check from "../../assets/check.svg";

const TarifCard = ({
  theme,
  name,
  descr,
  price,
  oldPrice,
  perMonth,
  tariffInclude,
  isActive,
}) => {
  const { isLogin } = useSelector(({ Auth }) => Auth);

  return (
    <>
      <div className="rate__card card" style={{border: `1px solid ${theme === "orange" ? "#FFB64F" : theme === "teal" ? "#7CE3E1" : "#000000"}`}}>
        <div className={cn("card__header", {
          "orange": theme === "orange",
          "teal": theme === "teal",
          "black": theme === "black",
        })}
        >
          <div className={cn("card__headerText", {
            "whiteText": theme === "black"
          })}>
            <h4>{name}</h4>
            <p>{descr}</p>
          </div>

          <div className="card__icon">
            {
              theme === "orange" ? <img src={bulb} alt="Bulb" />
              : theme === "teal" ? <img src={target} alt="Target" />
              : <img src={laptop} alt="Laptop" />
            }

          </div>
        </div>

        <div className="card__content">
          {
            isLogin && isActive ? <div className="card__currentRate">Текущий тариф</div> : ""
          }

          <div className="card__price">
            <div className="card__currentPrice">{price} &#8381;</div>
            <div className="card__oldPrice">{oldPrice} &#8381;</div>
          </div>
          <p>или {perMonth} ₽/мес. при рассрочке на 24 мес.</p>

          <div className="card__rateIncluded">
            <strong>В тариф входит:</strong>
            <ul>
              {
                tariffInclude.map((elem) => {
                  return (
                    <li key={elem}>
                      <div className="card__check">
                        <img src={check} alt="Check" />
                      </div>
                      {elem}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className="card__bottom">
          <button className={cn("card__btn", {
            "card__btn_logined": isLogin && isActive
          })}>
            {
              isLogin && isActive ? <span>Перейти в личный кабинет</span> : "Подробнее"
            }
          </button>
        </div>
      </div>
    </>
  )
}

export default TarifCard
