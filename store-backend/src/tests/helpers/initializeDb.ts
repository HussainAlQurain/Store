const { execSync } = require('child_process');

const createTestDb = () => {
  try {
    execSync('set ENV=test&& npx tsc && db-migrate --env test up');
    console.log('Test database created successfully');
  } catch (error) {
    console.error('Error creating test database:', error);
  }
};

export default createTestDb;