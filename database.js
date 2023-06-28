const mysql = require('mysql');

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'process.env.DB_HOST',
  user: 'process.env.DB_USER',
  password: 'process.env.DB_PASSWORD',
  database: 'process.env.DB_NAME'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// User table name and columns
const tableName = 'myfirstdatabase';
const columns = {
  id: 'id',
  username: 'username',
  email: 'email',
  password: 'password'
};

// Create user table if it doesn't exist
connection.query(
  `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columns.id} INT AUTO_INCREMENT PRIMARY KEY,
    ${columns.username} VARCHAR(255) NOT NULL,
    ${columns.email} VARCHAR(255) NOT NULL,
    ${columns.password} VARCHAR(255) NOT NULL
  )`,
  (err) => {
    if (err) {
      console.error('Error creating user table:', err);
      return;
    }
    console.log('User table created or already exists');
  }
);

// Database operations
const database = {
  // Create a new user
  createUser: (username, email, password) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ${tableName} (${columns.username}, ${columns.email}, ${columns.password})
        VALUES (?, ?, ?)`;
      connection.query(query, [username, email, password], (err, results) => {
        if (err) {
          console.error('Error executing signup query:', err);
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  },

  // Get a user by username and password
 // Get a user by email and password
getUserByEmailAndPassword: (email, password) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${columns.email} = ? AND ${columns.password} = ?`;
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Error executing login query:', err);
        reject(err);
        return;
      }

      if (results.length > 0) {
        const user = results[0];
        resolve(user);
      } else {
        resolve(null); // User not found
      }
    });
  });
}


};

module.exports = database;

