import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Registration, Main, Header, Footer, Search, Report } from "./components";
import { setIsLogin } from "./redux/actions/Auth";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(({ Auth }) => Auth)
  const tokenExpire = Date.parse(localStorage.getItem("expire"));

  useEffect(() => {
    if (tokenExpire <= Date.now()) {
      localStorage.removeItem("expire");
      localStorage.removeItem("token");

      dispatch(setIsLogin(false));
    }

    if (localStorage.getItem("token")) {
      dispatch(setIsLogin(true));
    }
  }, [isLogin]);

  return (
    <>
      <div className="App wrapper">
        <header>
          <Header />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path={"/registration"} element={<Registration />}></Route>
            <Route path={"/search"} element={<Search />}></Route>
            <Route path={"/report"} element={<Report />} />
          </Routes>
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
