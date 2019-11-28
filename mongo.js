const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ivanlytovka:${password}@cluster0-yr6yt.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const pointSchema = new mongoose.Schema({
    type: String,
    content: String,
    longitude: Number,
    latitude: Number
})

const Point = mongoose.model('Point', pointSchema)

const point = new Point({
    type: "green",
    content: "Guitar",
    longitude: 43.657998,
    latitude: -79.378355
})

point.save().then(response => {
    console.log('point saved!')
    mongoose.connection.close()
})
