import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_EVENTS_CREATE = `
    CREATE TABLE events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date TEXT,
        owner TEXT,
    )
`

const SQL_USERS_CREATE = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT,
        email TEXT,
        password TEXT
    )
`

const SQL_GIFTS_CREATE = `
    CREATE TABLE gifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        url TEXT,
        checked INTEGER,
        image TEXT,
        event INTEGER
    )
`


const database = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log(err.message)
        throw err
    }
    else {
        console.log('Connected to the database')
        database.run(SQL_EVENTS_CREATE, (err) => {
            if(err){
                console.log(err.message)
            }
            else {
                console.log('Table events created')
            }
        })
        database.run(SQL_USERS_CREATE, (err) => {
            if(err){
                console.log(err.message)
            }
            else {
                console.log('Table users created')
            }
        })
        database.run(SQL_GIFTS_CREATE, (err) => {
            if(err){
                console.log(err.message)
            }
            else {
                console.log('Table gifts created')
            }
        })
    }
})

export default database