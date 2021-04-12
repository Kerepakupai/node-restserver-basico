const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('Base de datos online')
  } catch (error) {
    console.error(error)
    throw new Error('Error conectando con la base de datos')
  }
}

module.exports = {
  dbConnection
}
