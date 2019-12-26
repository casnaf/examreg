// const Sequelize = require('sequelize')
// const connection ={}
// const env = 'dev'
// const config = require('./config.json')[env]

// const sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     {
//         host: config.host,
//         port: config.port,
//         dialect: config.dialect,
//         pool: config.pool
//     }
// )

// sequelize.sync({
//     force: false
// }) 

// connection.sequelize = sequelize

// module.exports = connection

// mongodb
const mongoose = require('mongoose')

exports.connectDb = () => {
    const db_link = 'mongodb+srv://examreg:examreg123@test-vjpn7.gcp.mongodb.net/examreg?retryWrites=true&w=majority'
    mongoose.set('debug', true)
    mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
        console.log('database has been connected')
    })
}
