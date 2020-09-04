// In this file you can configure migrate-mongo
require('dotenv').config();

const config = {
  mongodb: { 
    url:   "mongodb+srv://alex:admin@cluster0.jczgn.mongodb.net/edu4u?retryWrites=true&w=majority",
    databaseName:  "edu4u",
 
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
