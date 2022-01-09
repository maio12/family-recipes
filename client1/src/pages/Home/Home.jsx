import React from "react";
import { Navbar } from "../../components/Navigation/Navbar";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import { AddNewRecipeButton } from "../../components/AddRecipeModal/AddNewRecipeButton";
import Page from "../Page";

const Home = () => {
  return (
    <Page>
      <div className="main">
        <Navbar />
        <RecipeList />
        <AddNewRecipeButton />
      </div>
    </Page>
  );
};

export default Home;
