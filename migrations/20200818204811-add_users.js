const createCollection = async (db) => {
  await db.createCollection('users', 
  // {
  //   validator: UserSchema,
  //   validationAction: 'error',
  //   validationLevel: 'strict',
  // }
  )

}
 
module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: 'users' }).toArray()
      if(col.length > 0) {
        throw new Error('Collection users already exists in MongoDb. Exited...')
      } else {
         await createCollection(db); 
      }
    } catch(err) {
      throw err
    }
  },
 
  async down(db) {
    try {  
      await (  db.getCollection('users')).drop();
    } catch(err) {
      throw err
    }
  },
}