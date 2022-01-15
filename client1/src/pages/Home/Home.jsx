import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Navbar } from "../../components/Navigation/Navbar";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import { AddNewRecipeButton } from "../../components/AddRecipeModal/AddNewRecipeButton";
import Page from "../Page";
import {
  getRecipesQuery,
  getUsersQuery,
  recipesByGenreQuery,
} from "../../queries/queries";
import { GlobalContext } from "../../context/GlobalState";

const Home = () => {
  const { recipePage, setRecipes, recipes } = useContext(GlobalContext);

  const { loading, error, data } = useQuery(getRecipesQuery, {
    variables: { page: recipePage },
  });

  useEffect(() => {
    data && setRecipes(data.recipes.recipes, false);
  }, [data]);

  const usersData = useQuery(getUsersQuery);

  const recipesByGenreData = useQuery(recipesByGenreQuery);

  if (error) {
    console.log(`error in RecipeList ${error}`);
  }
  return loading ? (
    <Page>
      <div className="main">
        <Navbar isLoading users={[]} recipes={[]} />
        <RecipeList recipes={[]}>Loading recipes....</RecipeList>
      </div>
    </Page>
  ) : (
    <Page>
      <div className="main">
        {usersData.loading ? (
          <Navbar isLoading users={[]} recipes={recipes} />
        ) : recipesByGenreData.loading ? (
          <Navbar
            isLoading
            users={usersData.data.users.users}
            recipesByGenre={[]}
            recipes={recipes}
          />
        ) : (
          <Navbar
            recipes={recipes}
            users={usersData.data.users.users}
            recipesByGenre={
              recipesByGenreData.data.recipesByGenre.recipesByGenre
            }
          />
        )}
        <RecipeList recipes={recipes} totalRecipes={data.recipes.totalRecipes}>
          {" "}
        </RecipeList>
        <AddNewRecipeButton />
      </div>
    </Page>
  );
};

export default Home;
