const {Client} = require('pg');
const client = new Client({
    user:'postgres',
    host:'localhost',
    database:'fishes2',
    password:'temitope',
    port:5432
});
client.connect();

module.exports = client;