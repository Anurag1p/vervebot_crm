const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'cms1',
  password: '123456',
  port: 5432,
});

//EC2 Postgres Instance
// const pool = new Pool({
//   user: 'crm',
//   host: '13.41.145.64',
//   database: 'crm',
//   password: 'reactpostgres',
//   port: 5432,
// });

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM new_combination', (error, results) => {
      console.log("results : ",results);
      if (error) {
        console.log("error : ",error)
        reject(error)
      }
      resolve(results);
    })
  }) 
}
const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    pool.query('INSERT INTO new_combination (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results}`)
    })
  })
}
const deleteMerchant = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM new_combination WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`new_combination deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant
}
