const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


// const url =
//   `mongodb+srv://fullstack:${password}@cluster0.poymjxb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{6,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number, it should be xx-xxxxxx or xxx-xxxxxx`
    },
    required: true
  },
})



phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('person', phonebookSchema)