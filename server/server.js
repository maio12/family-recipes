const log = require('loglevel');
const app = require('./app');

const port = process.env.PORT || 4000;

app.listen(port, () => log.info(`🚀 now listening for requests on port ${port}`));