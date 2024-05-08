import db from '../config/database.js'

export const index = (req, res) => {
    db.query("SELECT * FROM messages", (err, result) => {
        if(err) {
            res.send(err)
        }
        else {
            res.json(result)
        }
    })
}