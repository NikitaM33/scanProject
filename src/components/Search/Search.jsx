import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import cn from "classnames";

import { DatePkr } from "../common";
import { objectSearch, objSearch } from "../../redux/actions/objectSearch";

import searchBanner from "../../assets/searchMan.svg";
import doc from "../../assets/doc.svg";
import docs from "../../assets/Docs.svg";

const SignupSchema = Yup.object().shape({
  inn: Yup.string()
    .min(10, 'Не менее 10 символов')
    .max(15, 'Не более 15 символов')
    .required('Обязательное поле!'),
  paperCount: Yup.number()
    .min(1, 'От 1 до 1000!')
    .max(1000, 'Не больше 1000!')
    .required('Обязательное поле!'),
  diapason1: Yup.string()
    .required('Обязательное поле!'),
  diapason2: Yup.string()
    .required('Обязательное поле!'),
});

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="search">
      <div className="search__space">
        <h1>Найдите необходимые данные в пару кликов.</h1>
        <p>Задайте параметры поиска. <br /> Чем больше заполните, тем точнее поиск</p>

          <div className="search__form">
            <div className="search__mainDoc">
              <img src={doc} alt="Doc" />
            </div>

            <Formik
              initialValues={{
                inn: "",
                tone: "any",
                paperCount: "",
                diapason1: "",
                diapason2: "",
                checked: [],
                onlyMainRole: false,
                onlyWithRiskFactors: false,
                excludeTechNews: false,
                excludeAnnouncements: false,
                excludeDigests: false,
                maxFullness: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { resetForm }) => {
                const searchObj = {
                  intervalType: "month",
                  histogramTypes: [
                    "totalDocuments",
                    "riskFactors",
                  ],
                  issueDateInterval: {
                    startDate: values.diapason1,
                    endDate: values.diapason2,
                  },
                  searchContext: {
                    targetSearchEntitiesContext: {
                      targetSearchEntities: [
                        {
                          type: "company",
                          sparkId: null,
                          entityId: null,
                          inn: values.inn,
                          maxFullness: values.maxFullness,
                          inBusinessNews: values.excludeTechNews
                        }
                      ],
                      onlyMainRole: values.onlyMainRole,
                      tonality: values.tone,
                      onlyWithRiskFactors: values.onlyWithRiskFactors,
                      riskFactors: {
                        and: [],
                        or: [],
                        not: []
                      },
                      themes: {
                        and: [],
                        or: [],
                        not: []
                      }
                    },
                    searchEntitiesFilter: {
                    and: [
                      {
                        type: "company"
                      }
                    ],
                    or: [
                      {
                        type: "company"
                      }
                    ],
                    not: [
                      {
                        type: "company"
                      }
                    ]
                    },
                    locationsFilter: {
                      and: [
                        {
                          countryCode: "string",
                          regionCode: 0
                        }
                      ],
                      or: [
                        {
                          countryCode: "string",
                          regionCode: 0
                        }
                      ],
                      not: [
                        {
                          countryCode: "string",
                          regionCode: 0
                        }
                      ]
                    },
                    themesFilter: {
                      and: [],
                      or: [],
                      not: []
                    }
                  },
                  searchArea: {
                    includedSources: [],
                    excludedSources: [],
                    includedSourceGroups: [],
                    excludedSourceGroups: []
                  },
                  attributeFilters: {
                    excludeTechNews: values.excludeTechNews,
                    excludeAnnouncements: values.excludeAnnouncements,
                    excludeDigests: values.excludeDigests
                  },
                  similarMode: "none",
                  limit: values.paperCount,
                  sortType: "sourceInfluence",
                  sortDirectionType: "desc",
                }

                dispatch(objectSearch(searchObj));
                dispatch(objSearch(searchObj));
                resetForm();
                navigate("/report", { replace: true });
              }}
            >
              {
                ({errors, touched, values}) => (
                  <Form className="search__form form">
                    <div className="form__info">
                      <label className="form__label">
                        <div className={cn("form__labelName", {
                          "supError": errors.inn && touched.inn
                        })}>
                          ИНН компании<sup>*</sup>
                        </div>
                        <Field type="number" name="inn" className={cn("form__input", {
                          "errorBorder": errors.inn && touched.inn
                        })} placeholder="10 цифр" />
                        <div className="form__error">
                          {errors.inn && touched.inn ? (
                            <>{errors.inn}</>
                          ) : null}
                        </div>
                      </label>

                      <label className="form__label form__supMargin">
                        Тональность
                        <Field
                          as="select"
                          name="tone"
                          className="form__input"
                        >
                          <option value="all">Любая</option>
                          <option value="positive">Позитивная</option>
                          <option value="negative">Негативная</option>
                        </Field>
                      </label>

                      <label className="form__label">
                        <div className={cn("form__labelName", {
                          "supError": errors.paperCount && touched.paperCount
                        })}>
                          Количество документов в выдаче<sup>*</sup>
                        </div>
                        <Field
                          type="number"
                          name="paperCount"
                          className={cn("form__input", {
                            "errorBorder": errors.paperCount && touched.paperCount
                          })}
                          placeholder="От 1 до 1000"
                        ></Field>
                        <div className="form__error">
                          {errors.paperCount && touched.paperCount ? (
                            <>{errors.paperCount}</>
                          ) : null}
                        </div>
                      </label>

                      <label className="form__dPicker">
                        <div className={cn("form__labelName", {
                          "supError": (errors.diapason1 || errors.diapason2) && (touched.diapason1 || touched.diapason2)
                        })}>
                          Диапазон поиска<sup>*</sup>
                        </div>
                        <div className="form__datePicker">
                          <div className="form__container">
                            <div className="form__dtPicker">
                              <DatePkr
                                name="diapason1"
                                plcholder="Дата начала"
                                error={errors.diapason1 || errors.diapason2}
                                isTouch={touched.diapason1 || touched.diapason2}
                              />
                            </div>

                            <div className="form__dtPicker">
                              <DatePkr
                                name="diapason2"
                                plcholder="Дата конца"
                                error={errors.diapason1 || errors.diapason2}
                                isTouch={touched.diapason1 || touched.diapason2}
                              />
                            </div>
                          </div>
                          <div className="form__error">
                            {(errors.diapason1 || errors.diapason2) && (touched.diapason1 || touched.diapason2) ? (
                              <>{errors.diapason1}</>
                            ) : null}
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="form__cheks">
                      <div role="group" aria-labelledby="checkbox-group" className="form__checkList">
                        <div className="check">
                          <label>
                            <Field type="checkbox" name="maxFullness" />
                            <div className="check__fancy"></div>
                            Признак максимальной полноты
                          </label>
                        </div>

                        <div className="check">
                          <label>
                            <Field type="checkbox" name="onlyMainRole" />
                            <div className="check__fancy"></div>
                            Главная роль в публикации
                          </label>
                        </div>

                        <div className="check">
                          <label>
                            <Field type="checkbox" name="onlyWithRiskFactors" />
                            <div className="check__fancy"></div>
                            Публикации только с риск-факторами
                          </label>
                        </div>

                        <div className="check">
                          <label>
                            <Field type="checkbox" name="excludeTechNews" />
                            <div className="check__fancy"></div>
                            Включать технические новости рынков
                          </label>
                        </div>

                        <div className="check">
                          <label>
                            <Field type="checkbox" name="excludeAnnouncements" />
                            <div className="check__fancy"></div>
                            Включать анонсы и календари
                          </label>
                        </div>

                        <div className="check">
                          <label>
                            <Field type="checkbox" name="excludeDigests" />
                            <div className="check__fancy"></div>
                            Включать сводки новостей
                          </label>
                        </div>
                      </div>

                      <div className="form__submitBtn">
                        <button
                          type="submit"
                          className={cn("form__btn", {
                            "active": values.inn && values.paperCount && values.diapason1 && values.diapason2
                          })}
                          disabled={errors.inn && errors.paperCount}
                        >Поиск</button>
                        <span>* Обязательные к заполнению поля</span>
                      </div>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
      </div>

      <div className="search__banner searchbanner">
        <div className="searchbanner__docs">
          <div className="searchbanner__twoDocs">
            <img src={docs} alt="Docs" />
          </div>
        </div>

        <div className="searchbanner__searchMan">
          <img src={searchBanner} alt="Banner" />
        </div>
      </div>
    </section>
  )
}

export default Search
