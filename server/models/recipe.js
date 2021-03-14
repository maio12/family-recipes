const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
    prepTime: Number,
    cookTime: Number,
    ingredientsFor: Number,
    preparation: String,
    veggie: Boolean,
    ingredients: [Object],
});

module.exports = mongoose.model('Recipe', recipeSchema);
