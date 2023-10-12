import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { MultiCarousel, Loader } from "../common";

import searchWoman from "../../assets/searchWomen.svg";
import contentImg from "../../assets/contentImg.jpg";
import dataScience from "../../assets/data.jpg";

const Report = () => {
  const { searchData } = useSelector(({ objectSearchState }) => objectSearchState);
  const pagesCount = [];
  let separated = [];
  let currentPage = 1;
  let rows = 7;

  // Made readable date
  const fitDate = (date) => {
    const splitedDate = date.slice(0, 10).split("-").reverse().join(".");
    return splitedDate;
  }

  // Pagination in carousel
  const displayList = (list, rows, page) => {
    if (list && list.length > 7) {
      let pageCount = Math.ceil(list.length / rows);

      for(let j = 0; j <= pageCount - 1; j++) {
        page = j;
        let start = rows * page;
        let end = start + rows;
        let sliced = list.slice(start, end);

        for(let i = 0; i < sliced.length; i++) {
          separated.push(sliced[i]);
        }

        pagesCount.push(separated);
        separated = [];
      }

      return pagesCount;
    }

    page = 0;
    let start = rows * page;
    let end = start + rows;
    let sliced = list.slice(start, end);

    for(let i = 0; i < sliced.length; i++) {
      separated.push(sliced[i]);
    }

    pagesCount.push(separated);
    separated = [];

    return pagesCount;
  }

  return (
    <>
      {/* Banner */}
      <section className="report">
        <div className="report__header">
          <h1>Ищем. Скоро <br />будут результаты</h1>
          <p>Поиск может занять некоторое время, <br />просим сохранять терпение.</p>
        </div>

        <div className="report__banner">
          <img src={searchWoman} alt="Search woman" />
        </div>
      </section>

      {/* Results */}
      <section className="summary">
        <div className="summary__header">
          <h2>Общая сводка</h2>
          <p>Найдено <span>4 221</span> вариантов</p>
        </div>

        <div className="summary__carousel">
          <MultiCarousel
            xl={1}
            desk={1}
            tab={1}
            mob={1}
          >
            {
              !searchData.length ? (
                <div className="summary__loader">
                  <Loader />
                </div>
              ) : (
                displayList(searchData[0].data, rows, currentPage).map((item, index) => {
                  return (
                    <div key={index} className="summary__slide">
                      {/* Header */}
                      <div className="summary__side">
                        <div className="summary__headText">Период</div>
                        <div className="summary__headText">Всего</div>
                        <div className="summary__headText">Риски</div>
                      </div>

                      {/* Result */}
                      {
                        !searchData.length ? (
                          <div className="summary__loader">
                            <Loader />
                          </div>
                        )
                        : (
                          <ul className="summary__results">
                            {
                              item.map((elem, index) => {
                                return (
                                  <li key={elem + index} className="summary__cell">
                                    <div className="summary__date">{fitDate(elem.date)}</div>
                                    <div className="summary__total">{elem.value}</div>
                                    <div className="summary__risks">0</div>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        )
                      }
                    </div>
                  )
                })
              )
            }
          </MultiCarousel>
        </div>
      </section>

      {/* News */}
      <section className="documents">
        <h2>Список документов</h2>

        <ul>
          <li className="documents__news">
            <span>13.09.2021 <Link to="#">Комсомольская правда KP.RU</Link></span>

            <h3>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>

            <div className="documents__category">Технические новости</div>

            <div className="documents__content">
              <div className="documents__newsImg">
                <img src={contentImg} alt="News" />
              </div>

              <div className="documents__newsText">
                <p>
                  SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.
                </p>

                <p>
                  Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.
                </p>
              </div>
            </div>

            <div className="documents__bottom">
              <button>Читать в источнике</button>
              <span>2 543 слова</span>
            </div>
          </li>

          <li className="documents__news">
            <span>15.10.2021 <Link to="#">VC.RU</Link></span>

            <h3>Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций</h3>

            <div className="documents__category">Технические новости</div>

            <div className="documents__content">
              <div className="documents__newsImg">
                <img src={dataScience} alt="News" />
              </div>

              <div className="documents__newsText">
                <p>
                  Кто такой Data Scientist и чем он занимается?
                  Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.
                </p>

                <p>
                  В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.
                </p>
              </div>
            </div>

            <div className="documents__bottom">
              <button>Читать в источнике</button>
              <span>3 233 слова</span>
            </div>
          </li>
        </ul>

        <div className="documents__more">
          <button>Показать больше</button>
        </div>
      </section>
    </>
  )
}

export default Report;
