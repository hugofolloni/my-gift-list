import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_ITENS_CREATE = `
    CREATE TABLE itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )
`

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.log(err.message)
        throw err
    }
    else {
        console.log('Connected to the database')
        database.run(SQL_ITENS_CREATE, (err) => {
            if(err){
                console.log(err.message)
            }
            else {
                console.log('Table itens created')
            }
        })
    }
})

export default database