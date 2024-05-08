import db from '../config/database.js'

export const login = (req, res) => {
    console.log(req.body)
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [req.body.username, req.body.password], (err, result) => {
        if(err) {
            console.log('it errors')
            console.log(err)
            res.send(err)
        }
        else {
            console.log('it  is ok? tf')
            res.json(result)
        }
    })
}

export const register = (req, res) => {
    console.log(req.body)
    db.query("INSERT INTO users SET", req.body, (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}