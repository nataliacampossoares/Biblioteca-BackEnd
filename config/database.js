const  pg  = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const Pool = new pg.Pool({
  connectionString: process.env.CONNECTION_STRING
});

Pool.on('connect', () => {
  console.log('BD conectado');
});

module.exports = { Pool };