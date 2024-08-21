// import connection
import db from "../config/database.js";

//function inserts the restaurant to the db 
export const insertRestaurant = (name, address, phone, user_id, registered_when) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Restaurants (name, address, phone, user_id, registered_when) VALUES (?, ?, ?, ?, ?)", [name, address, phone, user_id, registered_when], (error, result) => {
            if (error) {
                return reject(error)
            }
            db.query(`UPDATE Users SET role = 3 WHERE user_id = ${user_id}`, (err, result) => {
                if(err) {
                    console.log(err)
                }
                else{
                    return result
                }
            })
            return resolve(result)
        })
    })
}

//update user
/**
 * @function updateRestaurant() takes two parametter
 * @param email from the req.body
 * @param data as req.body
*/
export const updateRestaurant = ( data, result) => {
    console.log(data)
    db.query(`UPDATE Restaurants SET name = '${data.name}', phone = '${data.phone}', address = '${data.address}' WHERE restaurant_id = '${data.id}'`, (err, results) => {
        if(err) {
            console.log(err)
            result(err, null);
        }
        else{
            result(null, results[0])
        }
    })
}

// get single restaurant
export const getRestaurantById = (data,result) => {
    
    db.query(`SELECT * FROM Restaurants WHERE user_id = ${data}`, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};