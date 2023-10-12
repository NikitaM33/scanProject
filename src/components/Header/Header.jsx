import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";

import mainLogo from "../../assets/Mask group.png";
import user from "../../assets/user.jpg";
import { Loader } from "../common";
import { setIsLogin } from "../../redux/actions/Auth";
import { fetchAccauntInfo } from "../../redux/actions/accauntInfo";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(({ Auth }) => Auth);
  const { accInfo, isLimit } = useSelector(({ accauntInfo }) => accauntInfo);
  const [isLoged, setIsLoged] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const filterInfo = accInfo.eventFiltersInfo;

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expire");

    dispatch(setIsLogin(false));
    setIsMenu(false);
  };

  const setMenu = () => {
    setIsMenu(!isMenu);
  }

  useEffect(() => {
    setIsLoged(isLogin);

    if (isLogin) {
      dispatch(fetchAccauntInfo());
    }
  }, [isLogin]);

  return (
    <div className="menu">
      {/* LOGO */}
      <div className="menu__logo">
        <Link to="/">
          <img src={mainLogo} alt="Logo" />
        </Link>
      </div>

      {
              isLoged && (
                <div className="menu__limitInfo limitInfo_mobile">
                  {/* LIMIT INFO */}
                  {isLimit ? (
                    <>
                      <div className="limitInfo__used">
                        <p>Использовано компаний</p>
                        <span>{filterInfo ? filterInfo.usedCompanyCount : ""}</span>
                      </div>
                      <div className="limitInfo__limit">
                        <p>Лимит по компаниям</p>
                        <span>{filterInfo ? filterInfo.companyLimit : ""}</span>
                      </div>
                    </>
                  ) : (
                    <div className="limitInfo__loader">
                      <Loader />
                    </div>
                  )}
                </div>
              )
            }

      {/* MENU ICON */}
      <div onClick={setMenu} className={cn("menu__icon", {
        "_menuActive": isMenu
      })}>
        <span></span>
      </div>

      {/* NAVIGATION */}
      <nav className={cn("menu__nav", {
        "menuActive": isMenu
      })}>
        <ul>
          <li className="menu__navigate">
            <ul>
              <li>
                <Link to="/" onClick={() => setIsMenu(false)}>Главная</Link>
              </li>
              <li>
                <Link to="#">Тарифы</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
            </ul>
          </li>

          <li>
            {
              isLoged && (
                <div className="menu__limitInfo limitInfo_desk">
                  {/* LIMIT INFO */}
                  {isLimit ? (
                    <>
                      <div className="limitInfo__used">
                        <p>Использовано компаний</p>
                        <span>{filterInfo ? filterInfo.usedCompanyCount : ""}</span>
                      </div>
                      <div className="limitInfo__limit">
                        <p>Лимит по компаниям</p>
                        <span>{filterInfo ? filterInfo.companyLimit : ""}</span>
                      </div>
                    </>
                  ) : (
                    <div className="limitInfo__loader">
                      <Loader />
                    </div>
                  )}
                </div>
              )
            }
          </li>

          <li>
            {/* INFO */}
            {isLoged ? (
              <div className="menu__registration">
                {/* USER INFO */}
                <div className="menu__user">
                  <div className="menu__userPhoto">
                    <img src={user} alt="User" />
                  </div>

                  <div className="menu__userName">
                    <span>Алексей А.</span>
                    <Link onClick={logOut} to="/">
                      Выйти
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* LOG IN / SIGN IN */}
                <div className="menu__registration">
                  <div className="menu__container">
                    <div className="menu__signIn">
                      <Link to="#">Зарегистрироваться</Link>
                    </div>
                    <div className="menu__devider"></div>
                    <div className="menu__logIn">
                      <Link to="/registration" onClick={() => setIsMenu(false)}>Войти</Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
