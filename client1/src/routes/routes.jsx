import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import { SplashPage } from "../pages/SplashHome/SplashPage";
import Page404 from "../pages/Error/404";
import { GlobalContext } from "../context/GlobalState";

export const AnimatedSwitch = ({ children }) => {
  return <Routes>{children}</Routes>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useContext(GlobalContext);

  let innerBlock;
  isAuthenticated
    ? (innerBlock = (
        <AnimatedSwitch>
          <Route exact path="/home" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </AnimatedSwitch>
      ))
    : (innerBlock = (
        <AnimatedSwitch>
          <Route exact path="*" element={<SplashPage />} />
        </AnimatedSwitch>
      ));

  const routes = (
    <div>
      <BrowserRouter>{innerBlock}</BrowserRouter>
    </div>
  );

  return routes;
};

export default AppRoutes;
