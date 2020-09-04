module.exports = {
  async up(db, client) {
    try {
      const col = await db.listCollections({ name: 'universities' }).toArray()
      if(col.length > 0) {
        await db.collection('universities').createIndex({parentDepartment: 1});
        await db.collection('universities').insertMany([
            {
              _id: "5f3d89be43e43f19549c7df9",
              departmentName: "Universit1 test" 
            },
            {
              departmentName: "University2 test" 
            },
            { 
              departmentName: "University3 test" 
             }]

          );
      } else {
         throw new Error('Collection universities is not already exists in MongoDb. Exited...')
      }
    } catch(err) {
      throw err
    }
  },

  async down(db, client) { 
  }
};
