const { execSync } = require('child_process');

const resetDb = () => {
  try{
  execSync('db-migrate reset -e test --config ./database.json');
  }
  catch(error){
    console.error('Error resetting the database:', error)
  }
};

export default resetDb;