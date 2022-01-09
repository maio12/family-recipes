import React from "react";
import { useLocation } from "react-router-dom";
import Page from "../Page";

const Page404 = () => {
  const location = useLocation();
  return (
    <Page>
      <h1>404 Page not found</h1>
      <code>{location.pathname}</code>
    </Page>
  );
};

export default Page404;
