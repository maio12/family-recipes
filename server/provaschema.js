const graphql = require('graphql');
// const _ = require('lodash');
const Recipe = require('../models/recipe');
const Author = require('../models/author');

const { resolve } = require('path');

const { GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql;

const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    prepTime: {type: GraphQLInt},
    cookTime: {type: GraphQLInt},
    ingredientsFor: {type: GraphQLInt},
    // ingredients: {type: new GraphQLList(IngredientType)},
    preparation: {type: GraphQLString},
    type: {type: GraphQLString},
    veggie: {type: graphql.GraphQLBoolean},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    }
  })
  // name: 'Book',
  // fields: () => ({
  //   id: { type: GraphQLID},
  //   name: { type: GraphQLString },
  //   genre: { type: GraphQLString },
  //   author: { 
  //     type: AuthorType,
  //     resolve(parent, args) {
  //       // return _.find(authors, {id: parent.authorId})
  //       return Author.findById(parent.authorId); //from mongoose
  //     }  
  //   }
  // })
})

const IngredientType = new GraphQLInputObjectType({
  name: 'Ingredient',
  fields: () => ({
    ingredientName: {type: GraphQLString},
    ingredientQty: {type: GraphQLInt},
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString },
    //age: { type: GraphQLInt },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id })
        return Recipe.find({authorId: parent.id}) //from mongoose
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    recipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        //args.id  //because we defined the args id property and we can use the id to query the DB to get that specific boook
        // return _.find(books, { id:args.id })
        return Recipe.findById(args.id); //from mongoose
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id:args.id } )
        return Author.findById(args.id); //from mongoose
      }
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args){
        // return books
        return Recipe.find({}); //from mongoose
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        // return authors
        return Author.find({}); //from mongoose
      }
    } 
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        //age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          //age: args.age,
        });
        return author.save() //from mongoose
      }
    },
    addRecipe: {
      type: RecipeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        //genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        //id: {type: GraphQLID},
        //name: {type: GraphQLString},
        prepTime: {type: new GraphQLNonNull(GraphQLInt)},
        cookTime: {type: new GraphQLNonNull(GraphQLInt)},
        ingredientsFor: {type: new GraphQLNonNull(GraphQLInt)},
        // ingredients: {type: new GraphQLNonNull(IngredientType)},
        preparation: {type: new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLString)},
        veggie: {type: graphql.GraphQLBoolean},
        // author: {
        //   type: AuthorType,
        //   resolve(parent, args) {
        //     return Author.findById(parent.authorId);
        //   }
        // }
      },
      resolve(parent, args) {
        let recipe = new Recipe({
          name: args.name,
          //genre: args.genre,
          authorId: args.authorId,
          //name: String,
          prepTime: args.prepTime,
          cookTime: args.cookTime,
          ingredientsFor: args.ingredientsFor,
          // ingredients: args.ingredients,
          preparation: args.preparation,
          //authorId: String,
          type: args.type,
          veggie: args.veggie,
        });
        return recipe.save() //from mongoose
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})



////////////////////////////////////////////////////////////////////

// const graphql = require('graphql');
// const Book = require('../models/book');
// const Author = require('../models/author');
// const _ = require('lodash');

// const {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLSchema,
//     GraphQLID,
//     GraphQLInt,
//     GraphQLList,
//     GraphQLNonNull
// } = graphql;

// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: ( ) => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         author: {
//             type: AuthorType,
//             resolve(parent, args){
//                 return Author.findById(parent.authorId);
//             }
//         }
//     })
// });

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: ( ) => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args){
//                 return Book.find({ authorId: parent.id });
//             }
//         }
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args){
//                 return Book.findById(args.id);
//             }
//         },
//         author: {
//             type: AuthorType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args){
//                 return Author.findById(args.id);
//             }
//         },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args){
//                 return Book.find({});
//             }
//         },
//         authors: {
//             type: new GraphQLList(AuthorType),
//             resolve(parent, args){
//                 return Author.find({});
//             }
//         }
//     }
// });

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: GraphQLString },
//                 age: { type: GraphQLInt }
//             },
//             resolve(parent, args){
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });
//                 return author.save();
//             }
//         },
//         addBook: {
//             type: BookType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 genre: { type: new GraphQLNonNull(GraphQLString) },
//                 authorId: { type: new GraphQLNonNull(GraphQLID) }
//             },
//             resolve(parent, args){
//                 let book = new Book({
//                     name: args.name,
//                     genre: args.genre,
//                     authorId: args.authorId
//                 });
//                 return book.save();
//             }
//         }
//     }
// });

// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// });