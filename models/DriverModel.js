import db from "../config/database.js";

export const registerRestaurantDriver = (restaurant_id, user_id) => {

    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Drivers (user_id, restaurant_id) VALUES (?, ?)", [user_id, restaurant_id], (error, result) => {
            if (error) {
                return reject(error)
            }
            return resolve(result)
        })
    })
}

/**
 * get accepted Orders through defferent mechanisim
 * 
*/
// export const getDriverOrders = (driver_id) => {
//     return new Promise((resolve, reject) => {
//         db.query("SELECT * FROM billstatus WHERE driver_id = ?", [driver_id], (error, order) => {
//             if (error) {
//                 return reject(error)
//             }
//             if (order.length >= 1) {
//                 return resolve(order)
//             }

//             else {
//                 return resolve(null)
//             }

//         })
//     })
// }
// get all Bills Status
export const getDriverOrders = (driver_id, result) => {
    db.query(`SELECT * FROM billstatus WHERE driver_id = ${driver_id}`, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }
        else{
            result(null,results);
        }
    });
};

export const getDriverdetails = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Drivers WHERE user_id = ?", [user_id], (error, driver) => {
            if (error) {
                return reject(error)
            }
            if (driver.length >= 1) {
                return resolve(driver)
            }

            else {
                return resolve(null)
            }

        })
    })
}

export const updateUser = ( data, result) => {
    console.log(data)
    db.query(`UPDATE Drivers SET lincence_number = '${data.lincence_number}', vehicle_number = '${data.vehicle_number}' WHERE driver_id = '${data.driver_id}'`, (err, results) => {
        if(err) {
            console.log(err)
            result(err, null);
        }
        else{
            result(null, results[0])
        }
    })
}

//get drivers for delivery process
export const getDriverByRestaurant = (restaurant_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Drivers WHERE restaurant_id = ?", [restaurant_id], (error, driver) => {
            if (error) {
                return reject(error)
            }
            if (driver.length >= 1) {
                return resolve(driver)
            }

            else {
                return resolve(null)
            }

        })
    })
}