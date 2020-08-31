module.exports = {
  async up(db, client) {
    try {
      const col = await db.listCollections({ name: 'users' }).toArray()
      if(col.length > 0) {
        await db.collection('users').createIndex({email: 1});
        await db.collection('users').insertMany([
          {
              _id: "5f3d89be43e43f19549c7df8",
              firstName: "adminFirstName",
              lastName: "lastName",
              email: "admin@admin.com",
              password: "$2b$10$WeU9KW1AEO64NBdfjod/XuqY6Ss.5gbegV3SLP7wOb5howua0Ay/W",
              contactPhone: "contactPhone",
              title: "title",
              interests: "interests"
            },
            {
              _id: "5f3d89be43e43f19549c7df9",
              firstName: "userFirstName",
              lastName: "lastName",
              email: "user@user.com",
              password: "$2b$10$qnwY8OeO8PBO.jC1i45ea.hLgfuUiWp2iP7RuyFN0rmwIHL3OEwju",
              contactPhone: "contactPhone",
              title: "title",
              interests: "interests"
            },
            {
              _id: "5f3d89be43e43f19549c7dfa",
              firstName: "testFirstName",
              lastName: "lastName",
              email: "test@test.com",
              password: "$$2b$10$ORpdfgBgYmfnwgl/zCJrBOIcZc0RY3aVn1rgSQPp4KgtcLnmYUaOG",
              contactPhone: "contactPhone",
              title: "title",
              interests: "interests"
             }]

          );
      } else {
         throw new Error('Collection users is not already exists in MongoDb. Exited...')
      }
    } catch(err) {
      throw err
    }
  },

  async down(db, client) { 
  }
};
