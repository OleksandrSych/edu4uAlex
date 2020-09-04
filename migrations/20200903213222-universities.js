const createCollection = async (db) => {
  await db.createCollection('universities', 
  // {
  //   validator: DepartmentSchema,
  //   validationAction: 'error',
  //   validationLevel: 'strict',
  // }
  )
}
 
module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: 'universities' }).toArray()
      if(col.length > 0) {
        throw new Error('Collection universities already exists in MongoDb. Exited...')
      } else {
         await createCollection(db); 
      }
    } catch(err) {
      throw err
    }
  },
 
  async down(db) {
    try {  
      await (  db.getCollection('universities')).drop();
    } catch(err) {
      throw err
    }
  },
}