import React, { useContext, useReducer, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import { AUTH_TOKEN, USER_ID } from "../../constants/constants";

import { signupMutation } from "../../queries/queries";
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

export const Signup = () => {
  const { loginProva } = useContext(GlobalContext);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      password: "",
    },
    inputValidities: {
      name: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const navigate = useNavigate();
  const [signup] = useMutation(signupMutation, {
    variables: {
      userInput: {
        name: formState.inputValues.name,
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      },
    },
    onCompleted: async ({ createUser }) => {
      await localStorage.setItem(AUTH_TOKEN, createUser.authData.token);

      localStorage.setItem(USER_ID, createUser.authData.userId);
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
            id="name"
            label="Your name and surname"
            errorText="Please enter a valid name!"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
            type={"text"}
          />
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
        <button disabled={!formState.formIsValid} onClick={() => signup()}>
          Login
        </button>
      </div>
    </div>
  );
};
