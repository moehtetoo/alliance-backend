const db = require('./db.service');

async function findUser(username) {
    const rows = await db.query(
      `SELECT id, username, password FROM users WHERE username = ?`, 
      [username]
    );
    const user = rows[0];
  
    return user;
}

async function createUser(user) {
    const result = await db.query(
        `INSERT INTO users 
        (username, password, full_name) 
        VALUES 
        (?, ?, ?)`, 
        [
          user.username, user.password,
          user.fullName
        ]
      );
    
      let message = 'Error in creating user account';
    
      if (result.affectedRows) {
        message = 'User account created successfully';
      }
    
      return {message};
}

module.exports = {
    findUser,
    createUser,
  }