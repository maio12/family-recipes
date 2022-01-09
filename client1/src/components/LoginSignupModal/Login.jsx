import React, { useContext, useReducer, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { AUTH_TOKEN, USER_ID } from "../../constants/constants";

import { loginMutation } from "../../queries/queries";
import { CustomInput } from "../UI/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

export const Login = () => {
  const { loginProva } = useContext(GlobalContext);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const navigate = useNavigate();
  const [login] = useMutation(loginMutation, {
    variables: {
      email: formState.inputValues.email,
      password: formState.inputValues.password,
    },
    onCompleted: async ({ login }) => {
      await localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem(USER_ID, login.userId);
      await loginProva();
      navigate("/home");
    },
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <div>
      <form className="login-form" action="">
        <div className="field__recipe--name">
          <CustomInput
            id="email"
            label="Your email address"
            errorText="Please enter a valid email!"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
            email
            type={"text"}
          />
          {/* <label className="form__label" htmlFor="">
            Your email address
          </label>
          <input
            id="email"
            className="form__input"
            type="text"
            onChange={inputChangeHandler}
          /> */}
        </div>
        <div className="field__recipe--name">
          <CustomInput
            id="password"
            label="Your password"
            errorText="Please enter a valid password!"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
            minLength={12}
            type={"password"}
          />
        </div>
      </form>
      <div>
        <button
          onClick={() =>
            formState.inputValidities.email &&
            formState.inputValidities.password &&
            login()
          }
        >
          Login
        </button>
      </div>
    </div>
  );
};
