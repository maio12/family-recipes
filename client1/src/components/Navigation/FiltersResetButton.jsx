import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const FiltersResetButton = (props) => {
  //   const { resettable } = useContext(GlobalContext);

  return (
    <div onClick={props.onResetClick}>
      <div>Reset Filters</div>
    </div>
  );
};
