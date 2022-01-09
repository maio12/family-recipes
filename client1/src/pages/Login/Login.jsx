import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { AUTH_TOKEN, USER_ID } from "../../constants/constants";

import { loginMutation } from "../../queries/queries";

export const Login = () => {
  const { loginProva, logoutProva } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [login] = useMutation(loginMutation, {
    variables: {
      email: "charlotte.thomas@gmail.com",
      password: "ciaobau",
    },
    onCompleted: async ({ login }) => {
      await localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem(USER_ID, login.userId);
      await loginProva();
      navigate("/home");
    },
  });

  const deleteToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
    logoutProva();
  };

  return (
    <div>
      <form className="login-form" action="">
        <div className="field__recipe--name">
          <label className="form__label" htmlFor="">
            Your email address
          </label>
          <input className="form__input" type="text" onChange={() => {}} />
        </div>
        <div className="field__recipe--name">
          <label className="form__label" htmlFor="">
            Choose a safe password
          </label>
          <input className="form__input" type="text" onChange={() => {}} />
        </div>
      </form>
      <div>
        <button onClick={() => login()}>Login</button>
        <button onClick={() => deleteToken()}>Delete token</button>

        {/* <button onClick={() => createUser}>Need to create an account?</button> */}
      </div>
    </div>
  );
};
