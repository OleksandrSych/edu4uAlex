const createCollection = async (db) => {
  await db.createCollection('courses',
  //  {
  //   validator: CourseSchema,
  //   validationAction: 'error',
  //   validationLevel: 'strict',
  // }
  )
}
 
module.exports = {
  async up(db) {
    try {
      const col = await db.listCollections({ name: 'courses' }).toArray()
      if(col.length > 0) {
        throw new Error('Collection courses already exists in MongoDb. Exited...')
      } else {
         await createCollection(db); 
      }
    } catch(err) {
      throw err
    }
  },
 
  async down(db) {
    try {  
      await (  db.getCollection('courses')).drop();
    } catch(err) {
      throw err
    }
  },
}