const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'fullcycle',
    password: 'fullcycle_password',
    database: 'fullcycle'
};
const mysql = require('mysql')

const inserirNome = async (nome) => {
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('${nome}')`
    connection.query(sql)
    connection.end()
}

const consultarNomes = async (res) => {
    let page = '<h1>Full Cycle Rocks!!!</h1>'
    const connection = mysql.createConnection(config)
    const sql = `SELECT * FROM people`
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                mysql.end();
                res.send(`<h1>${error}</h1>`);
            }
            if (results.length > 0) {
                console.log(results);
                results.forEach(element => {
                    page += `\n<h1>nome: ${element['name']}</h1>`
                });
                res.send(page)
            } else {
                res.send(page)
            }
        }
    )
    connection.end()
}

app.get('/', async (req,res) => {
    await inserirNome('Samyr Bechelane')
    await consultarNomes(res)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})