const graphql = require('graphql');
const Recipe = require('../models/recipe');
const Author = require('../models/author');
const User = require('../models/user');

const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        prepTime: { type: GraphQLInt },
        cookTime: { type: GraphQLInt },
        ingredientsFor: { type: GraphQLInt },
        preparation: { type: GraphQLString },
        type: { type: GraphQLString },
        veggie: { type: graphql.GraphQLBoolean },
        ingredients: {
            type: new GraphQLList(IngredientTypeOut),
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
            }
        }
    })
});

const IngredientTypeOut = new GraphQLObjectType({
    name: 'IngredientOut',
    fields: () => ({
        id: { type: GraphQLInt },
        ingredientName: { type: GraphQLString },
        ingredientQty: { type: GraphQLInt },
    })
})

const IngredientType = new GraphQLInputObjectType({
    name: 'Ingredient',
    fields: () => ({
        id: { type: GraphQLInt },
        ingredientName: { type: GraphQLString },
        ingredientQty: { type: GraphQLInt },
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args) {
                return Recipe.find({ authorId: parent.id });
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: RecipeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Recipe.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args) {
                return Recipe.find({});
            }
        },
        recipeByName: {
            type: new GraphQLList(RecipeType),
            args: { name: { type: GraphQLString } },
            async resolve(parent, args) {
                const recipes = await Recipe.find({});
                return recipes.filter((p) => p.name.toLowerCase().includes(args.name.toLowerCase()));
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        loginUser: {
            type: GraphQLBoolean,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args, request) {
                const user = await User.find({ email: args.email });
                if (!user) {
                    throw new Error(
                        `Could not find account associated with email: ${args.email}`
                    );
                } else {
                    request.login(user, error => (error ? error : user));
                    return true;
                }
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addRecipe: {
            type: RecipeType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                prepTime: { type: new GraphQLNonNull(GraphQLInt) },
                cookTime: { type: new GraphQLNonNull(GraphQLInt) },
                ingredientsFor: { type: new GraphQLNonNull(GraphQLInt) },
                preparation: { type: new GraphQLNonNull(GraphQLString) },
                veggie: { type: graphql.GraphQLBoolean },
                ingredients: { type: new GraphQLList(IngredientType) }
            },
            resolve(parent, args) {
                let recipe = new Recipe({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    prepTime: args.prepTime,
                    cookTime: args.cookTime,
                    ingredientsFor: args.ingredientsFor,
                    preparation: args.preparation,
                    veggie: args.veggie,
                    ingredients: args.ingredients,
                });
                return recipe.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});