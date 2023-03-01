const elasticsearch = require('elasticsearch')
const dotEnv = require('dotenv');
dotEnv.config();
// Set up Elastic Search Client
const client = new elasticsearch.Client({
    host: process.env.BONSAI_URL,
    log: 'trace'
});

module.exports = client
