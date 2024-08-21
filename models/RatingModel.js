import db from "../config/database.js";


export const userRating = ( bill_id, rating, coment, user_id,) => {

    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Rating (bill_id, rating, coment, user_id) VALUES (?, ?, ?, ?)", [bill_id, rating, coment, user_id,], (error, result) => {
            if (error) {
                return reject(error)
            }
            return resolve(result)
        })
    })
}