require('dotenv').config()
const db = require('./src/db/db')
const app = require('./src/app')

app.listen(3001, () => {
    console.log('Server is running port 3001')
})