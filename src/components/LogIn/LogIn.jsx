import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import cn from "classnames";

import { fetchAuth } from "../../redux/actions/Auth";

import lock from "../../assets/lock.png";
import google from "../../assets/google.svg";
import facebook from "../../assets/f.svg";
import yandex from "../../assets/yandex.svg";

const signInSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, "Не менее 4 символов")
    .max(20, "Не более 20 символов")
    .required("Введите корректные данные"),
  password: Yup.string()
    .min(6, "Не менее 6 символов")
    .max(20, "Не более 20 символов")
    .required("Неправильный пароль"),
});

const LogIn = () => {
  const dispatch = useDispatch();
  const { wrongPass } = useSelector(({ Auth }) => Auth);
  const [ isWrongPass, setIsWrongPass ] = useState(false);

  useEffect(() => {
    wrongPass && setIsWrongPass(true)
  }, [wrongPass]);

  return (
    <div className="login">
      <div className="login__lock">
        <img src={lock} alt="Lock" />
      </div>
      <div className="auth">
        <div className="auth__signIn">Войти</div>
        <div className="auth__logIn">Зарегистрироваться</div>
      </div>

      {/* Form */}
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={
          (values) => {
            dispatch(fetchAuth(values))
          }
        }
      >
        {
          ({ errors, touched }) => (
            <Form>
              {/* LOGIN */}
              <label className="loginForm__label">
                Логин или номер телефона:
                <Field name="login" className={cn("loginForm__input", {
                  "errorBorder": errors.login && touched.login
                })} />
                <div className="error">
                  {errors.login && touched.login ? (
                    <>{errors.login}</>
                  ): null}
                </div>
              </label>

              {/* PASSWORD */}
              <label className="loginForm__label">
                Пароль:
                <Field name="password" className={cn("loginForm__input", {
                  "errorBorder": errors.password && touched.password
                })} />
                <div className="error">
                  {errors.password && touched.password ? (
                    <>{errors.password}</>
                  ) : null}
                </div>
              </label>

              <div className="error">
                {
                  isWrongPass ? (
                    <>Неверный логин или пароль</>
                  ) : null
                }
              </div>

              <button type="submit" className={cn("loginForm__btn", {
                "loginForm__dsbl": errors.login && errors.password
              })} disabled={errors.login && errors.password}>Войти</button>
            </Form>
          )
        }
      </Formik>

      {/* Recovery */}
      <div className="loginForm__recover">
        <Link to={"#"} className="loginForm__recovery">Восстановить пароль</Link>
      </div>

      {/* Alternative Sign in */}
      <div className="alternativeIn">
        Войти через:
        <div className="alternativeIn__Login">
          <div className="alternativeIn__link">
            <Link to="#">
              <img src={google} alt="Google" />
            </Link>
          </div>
          <div className="alternativeIn__link">
            <Link to="#">
              <img src={facebook} alt="Facebook" />
            </Link>
          </div>
          <div className="alternativeIn__link">
            <Link to="#">
              <img src={yandex} alt="Yandex" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
