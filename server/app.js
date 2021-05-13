require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const log = require('loglevel');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const expressPlayground = require('graphql-playground-middleware-express')
    .default
const cors = require('cors');

const app = express();

//allow cross origin requests
app.use(cors());

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

app.use('/graphql', graphqlHTTP({
    schema,
    //graphiql: true,
}))

app.get('/', expressPlayground({ endpoint: '/graphql' }))
const port = process.env.PORT || 4000;

app.listen(port, () => log.warn(`🚀 now listening for requests on port ${port}`));

module.exports = app;