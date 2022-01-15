import React, { useReducer, useEffect, useState } from "react";

const OPTION_CHANGE = "OPTION_CHANGE";
// const INPUT_BLUR = "INPUT_BLUR";

const selectReducer = (state, action) => {
  switch (action.type) {
    case OPTION_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    default:
      return state;
  }
};

export const CustomSelect = (props) => {
  const [selectState, dispatch] = useReducer(selectReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
  });
  const [dispatched, setDispatched] = useState(false);

  const { onSelectChange, id, initialValue } = props;

  const optionChangeHandler = (text) => {
    dispatch({
      type: OPTION_CHANGE,
      value: text,
      isValid: true,
    });
    setDispatched(!dispatched);
  };

  useEffect(() => {
    onSelectChange(id, selectState.value, selectState.isValid);
  }, [dispatched]);

  return (
    <div className="form-control">
      <label className="form__label">{props.label}</label>
      <select
        name=""
        id=""
        onChange={(e) => optionChangeHandler(e.target.value)}
      >
        {props.selectOptions.map((o) => {
          return (
            <option key={o.id} value={o.value}>
              {o.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
