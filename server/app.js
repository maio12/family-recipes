require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const uuid = require('uuid/v4');
const log = require('loglevel');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const expressPlayground = require('graphql-playground-middleware-express')
    .default
const cors = require('cors');
// const { ensureAuth, ensureGuest } = require('./middleware/auth');

const app = express();

//allow cross origin requests
app.use(cors());

//Passport config
require('./config/passport')(passport)

const options = { 
  useUnifiedTopology: true,
  useNewUrlParser: true
}

//connect to mlab database
mongoose.connect(`mongodb+srv://amaiocchi:${process.env.MONGOOSE_PW}@cluster0.zoh8e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, options)
.then(() => {
  log.warn('🗄️connected to DB');
})
.catch((err) => {
  log.warn(`MongoDB connection unsuccessful: ${err}`)
})

//Sessions middleware
app.use(session({
  genid: (req) => uuid(),
  secret: 'ciao',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', require('./routes/auth'))
app.use('/graphql', graphqlHTTP({
  schema,
  //graphiql: true,
}))

app.get('/', expressPlayground({ endpoint: '/graphql' }))
// app.get('/dashboard')
const port = process.env.PORT || 4000;

app.listen(port, () => log.warn(`🚀 now listening for requests on port ${port}`));

module.exports = app;