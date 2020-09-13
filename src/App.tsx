//typescript migration

import React from "react";
import { HashRouter, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "bootstrap/js/dist/tab.js";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/modal";

import "bootstrap/js/dist/collapse";

import PrivateRoute from "./utils/routes/PrivateRoutes";
import { appRoutes } from "./utils/routes";
import "./App.scss";
import { Header, Footer } from './components';

const App: React.FC<{}> = () => {
  let token: any = localStorage.getItem("access_token");
  return (
    <>
      <HashRouter>
        <div className="layout__wrapper">
          <Header />
          <div className="content__wrapper">
            {!token && <Redirect to="/homepage" />}
            {token && <Redirect to="/home" />}
            <PrivateRoute appRoutes={appRoutes} />
          </div>
          <Footer />
        </div>
      </HashRouter>
      <ToastContainer position="bottom-right" autoClose={2500} />
    </>
  );
};

export default App;
