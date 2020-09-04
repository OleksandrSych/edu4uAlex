module.exports = {
  async up(db, client) {
    try {
      const col = await db.listCollections({ name: 'courses' }).toArray()
      if(col.length > 0) {
        await db.collection('courses').createIndex({parentDepartment: 1});
        await db.collection('courses').insertMany([
            {
              parentDepartment: "5f3d89be43e43f19549c7df9",
              courseName: "courses 1 test" 
            },
            {
              parentDepartment: "5f3d89be43e43f19549c7df9",
              courseName: "courses 2 test" 
            },
            { 
              parentDepartment: "5f3d89be43e43f19549c7df9",
              courseName: "course 3 test" 
             }]

          );
      } else {
         throw new Error('Collection courses is not already exists in MongoDb. Exited...')
      }
    } catch(err) {
      throw err
    }
  },

  async down(db, client) { 
  }
};
