// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Searchbar } from "./Searchbar/Searchbar";
import { RecipesTypeDropdown } from "./RecipesTypeDropdown/RecipesTypeDropdown";
import { AuthorsDropdown } from "./AuthorsDropdown/AuthorsDropdown";
import { FiltersResetButton } from "./FiltersResetButton";
import { VeggieButton } from "./VeggieButton";
import { GlobalContext } from "../../context/GlobalState";
import { getRecipesQuery } from "../../queries/queries";

export const Navbar = (props) => {
  const [recipeTypeOpen, setRecipeTypeOpen] = useState(false);
  const [authorDDOpen, setAuthorDDOpen] = useState(false);
  const [recipeDDOpen, setRecipeDDOpen] = useState(false);
  const [veggieDDOpen, setVeggieDDOpen] = useState(false);

  const { resettable, setRecipes, recipePage } = useContext(GlobalContext);

  if (props.isLoading) {
    //do sth
  }

  console.log(props, "NAVBAR PROPS-------------");

  const navigate = useNavigate();

  const userIconClickHandler = () => {
    navigate("/user", { state: "provaprova-----" });
  };

  const reData = useQuery(getRecipesQuery, {
    variables: { page: recipePage },
  });

  const onResetClickHandler = () => {
    setRecipes(reData.data.recipes.recipes, false);
  };

  return (
    <nav className="navbar">
      <h1>Family recipes</h1>
      <ul className="navbar__group">
        {resettable && (
          <li className="navbar__item">
            <FiltersResetButton
              onResetClick={() => {
                onResetClickHandler();
              }}
            />
          </li>
        )}
        <li
          onMouseEnter={() => setAuthorDDOpen(true)}
          onMouseLeave={() => setAuthorDDOpen(false)}
          className="navbar__item"
        >
          <AuthorsDropdown open={authorDDOpen} authors={props.users} />
        </li>
        <li
          onMouseEnter={() => setRecipeDDOpen(true)}
          onMouseLeave={() => setRecipeDDOpen(false)}
          className="navbar__item"
        >
          <RecipesTypeDropdown
            open={recipeDDOpen}
            recipesByGenre={props.recipesByGenre}
          />
        </li>
        {props.recipes.filter((r) => r.veggie === true).length > 0 && (
          <li
            onMouseEnter={() => setVeggieDDOpen(true)}
            onMouseLeave={() => setVeggieDDOpen(false)}
            className="navbar__item"
          >
            <VeggieButton
              open={veggieDDOpen}
              recipes={props.recipes.filter((r) => r.veggie === true)}
            />
          </li>
        )}
        <li className="navbar__item">
          <Searchbar />
        </li>
        <li className="navbar__item">
          <FaUser onClick={() => userIconClickHandler()} />
          {/* <FontAwesomeIcon icon={faUserCircle} /> */}
        </li>
      </ul>
    </nav>
  );
};
