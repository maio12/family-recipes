require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const log = require("loglevel");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const expressPlayground =
  require("graphql-playground-middleware-express").default;
// const cors = require("cors");
const auth = require("./middleware/auth");

const app = express();

//allow cross origin requests
// app.use(cors());

app.use(express.json()); // application/json

app.use((req, res, next) => {
  // console.log(req, "inside the app.use cors------", res);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const port = process.env.PORT || 4000;

//connect to mlab database
mongoose
  .connect(
    `mongodb+srv://amaiocchi:${process.env.MONGO_PW}@cluster0.zoh8e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    options
  )
  .then(() => {
    log.warn("🗄️connected to DB");
  })
  .then(() => {
    app.listen(port, () =>
      log.warn(`🚀 now listening for requests on port ${port}`)
    );
  })
  .catch((err) => {
    log.warn(`MongoDB connection unsuccessful: ${err}`);
  });

app.get("/", expressPlayground({ endpoint: "/graphql" }));

module.exports = app;
