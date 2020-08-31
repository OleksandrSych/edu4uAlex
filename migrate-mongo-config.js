// In this file you can configure migrate-mongo
require('dotenv').config();

const config = {
  mongodb: { 
    url: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${parseInt(process.env.DB_PORT)}`,
    databaseName: `${process.env.DB_DATABASE_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js"
};

// Return the config as a promise
module.exports = config;
