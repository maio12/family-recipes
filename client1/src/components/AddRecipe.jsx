import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import AddIngredient from './AddIngredient';
import {useMutation, useQuery} from '@apollo/client';

import { getAuthorsQuery, addRecipeMutation, getRecipesQuery } from '../queries/queries';

const displayAuthors = (l, d, e) => {
  let authors;
  if (d) {
    authors = d.authors;
  } 
  if (e) {
    console.log(`error in AddRecipe ${e}`)
    return 
  }
  return (
    l ? 
      <option disabled>Loading Authors...</option> : 
      authors.map(  
        author => 
          <option key={author.id} value={author.id}>{author.name}</option>
      )
  )
}

export const AddRecipe = () => {
  const { loading, data, error } = useQuery(getAuthorsQuery);
  const [addRecipe] = useMutation(addRecipeMutation);
  const {ingredients} = useContext(GlobalContext);
  const { cleanIngredients } = useContext(GlobalContext);

  console.log(data)
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [preparation, setPreparation] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [ingredientsFor, setIngredientsFor] = useState(0);
  const [veggie, setVeggie] = useState(false);

  const cleanFieldsAndIngredientsState = () => {
    setName('');
    setGenre('');
    setAuthor('');
    setPreparation('');
    setPrepTime(0);
    setCookTime(0);
    setIngredientsFor(0);
    setVeggie(false);
    cleanIngredients();
  }
  
  const submitForm = e => {
    e.preventDefault();
    addRecipe({ variables: { name: name, genre: genre, authorId: author, ingredients: ingredients, preparation: preparation, prepTime: prepTime, cookTime: cookTime, ingredientsFor: ingredientsFor, veggie: veggie }, refetchQueries: [{ query: getRecipesQuery }] });
    console.log(ingredients, prepTime, cookTime, ingredientsFor)
    cleanFieldsAndIngredientsState();
  }

  return (
    <form className="add-book" action="" onSubmit={submitForm}>
      <div className="field__book--name">
        <label className="form__label" htmlFor="">Recipe name</label>
        <input className="form__input" type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field__book--genre">
        <label className="form__label" htmlFor="">Genre</label>
        <input className="form__input" type="text" onChange={(e) => setGenre(e.target.value)}/>
      </div>
      
      <div className="field__book--genre">
        <label className="form__label" htmlFor="">Preparation</label>
        <input className="form__input" type="text" onChange={(e) => setPreparation(e.target.value)}/>
      </div>
      <div className="field__book--genre">
        <label className="form__label" htmlFor="">Prep Time</label>
        <input className="form__input" type="text" onChange={(e) => setPrepTime(parseInt(e.target.value, 10))}/>
      </div>
      <div className="field__book--genre">
        <label className="form__label" htmlFor="">Cook Time</label>
        <input className="form__input" type="text" onChange={(e) => setCookTime(parseInt(e.target.value, 10))}/>
      </div>
      <div className="field__book--genre">
        <label className="form__label" htmlFor="">Ingredients For</label>
        <input className="form__input" type="text" onChange={(e) => setIngredientsFor(parseInt(e.target.value, 10))}/>
      </div>
      <div className="field__book--genre">
        <label className="form__label" htmlFor="">Veggie?</label>
        <input className="form__input" type="text" onChange={(e) => setVeggie(e.target.value)}/>
      </div>
      <div className="field__book--author">
        <label className="form__label" htmlFor="">Author:</label>
        <select className="form__select" name="" id="" onChange={(e) => setAuthor(e.target.value)}>
          <option value="">Select author</option>
          {displayAuthors(loading, data, error)}
        </select>
      </div>
      <AddIngredient/>
    <button className="form__button" type="submit">+</button>
    </form>
  )
}

// export default graphql(addBookMutation)(graphql(getAuthorsQuery)(AddBook))