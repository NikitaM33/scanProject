import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import baner from "../../assets/2398 1.png";
import cloud from "../../assets/cloud.svg";
import { MultiCarousel } from "../common";
import { TarifCard } from "../";

import men from "../../assets/men.svg";
import clock from "../../assets/clock.svg";
import dotSearch from "../../assets/searchDots.svg";
import shield from "../../assets/shield.svg";

const Main = () => {
  const { isLogin } = useSelector(({ Auth }) => Auth);

  return (
    <>
      {/* Banner */}
      <section className="banner">
        {/* Text */}
        <div className="banner__text">
          <h1>Cервис по поиску публикаций о компании по его ИНН</h1>
          <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>

          {
            isLogin ? <Link to={"/search"} className="banner__requestBtn">Запросить данные</Link> : ""
          }
        </div>

        {/* Img */}
        <div className="banner__image">
          <img src={baner} alt="banner" />
        </div>
      </section>

      {/* Why we */}
      <section className="whyWe">
        <h2>Почему именно мы</h2>

        <div className="whyWe__carousel">
          <MultiCarousel
            xl={5}
            desk={3}
            tab={2}
            mob={1}
          >
            <div className="slide">
              <div className="slide__icon">
                <img src={clock} alt="clock" />
              </div>

              <p>Высокая и оперативная скорость обработки заявки</p>
            </div>

            <div className="slide">
              <div className="slide__icon">
                <img src={dotSearch} alt="Dot search" />
              </div>

              <p>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
            </div>

            <div className="slide">
              <div className="slide__icon">
                <img src={shield} alt="Shield" />
              </div>

              <p>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
            </div>

            <div className="slide">
              <div className="slide__icon">
                <img src={shield} alt="Shield" />
              </div>

              <p>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
            </div>
          </MultiCarousel>
        </div>

        <div className="whyWe__banner">
          <div className="whyWe__bannerLeft">
            <img src={men} alt="Men" />
          </div>
          <div className="whyWe__bannerRight">
            <img src={cloud} alt="Men" />
          </div>
        </div>
      </section>

      {/* Rate */}
      <section className="rate">
        <h2>Наши тарифы</h2>

        <div className="rate__cards">
          <TarifCard
            theme={"orange"}
            name={"Beginner"}
            descr={"Для небольшого исследования"}
            price={799}
            oldPrice={1200}
            perMonth={150}
            tariffInclude={["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"]}
            isActive
          />

          <TarifCard
            theme={"teal"}
            name={"Pro"}
            descr={"Для HR и фрилансеров"}
            price={1299}
            oldPrice={2600}
            perMonth={279}
            tariffInclude={["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"]}
          />

          <TarifCard
            theme={"black"}
            name={"Business"}
            descr={"Для корпоративных клиентов"}
            price={2379}
            oldPrice={3700}
            perMonth={279}
            tariffInclude={["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"]}
          />
        </div>
      </section>
    </>
  );
};

export default Main;
