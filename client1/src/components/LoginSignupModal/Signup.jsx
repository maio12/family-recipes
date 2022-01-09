import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { AUTH_TOKEN, USER_ID } from "../../constants/constants";

import { signupMutation } from "../../queries/queries";

export const Signup = () => {
  const { loginProva } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [signup] = useMutation(signupMutation, {
    variables: {
      name: "Charlotte Thomas",
      email: "charlotte.thomas@gmail.com",
      password: "ciaobau",
    },
    onCompleted: async ({ signup }) => {
      //   await localStorage.setItem(AUTH_TOKEN, login.token);
      //   localStorage.setItem(USER_ID, login.userId);
      await loginProva();
      navigate("/home");
    },
  });

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
            Your password
          </label>
          <input className="form__input" type="text" onChange={() => {}} />
        </div>
      </form>
      <div>
        <button onClick={() => {}}>Login</button>
      </div>
    </div>
  );
};
