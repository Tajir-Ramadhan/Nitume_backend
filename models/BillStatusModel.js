// import connection
import db from "../config/database.js";

// get newest Bill Status
export const getNewestId = (result) => {
    db.query("SELECT bill_id FROM billstatus ORDER BY bill_id DESC LIMIT 0, 1", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results[0]);
        }
    });
};

// insert Bill Status
export const insertBillStatus = (id, data, result) => {
    db.query("INSERT INTO billstatus SET ?", data, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            db.query(`select food_id from billdetails where bill_id = ${id}`, (err, foodID) => {
                if (err) {
                    console.log(err)
                    console.log('from food select')
                    result(err, null)
                }
                else {
                    console.log(`food Id selected ${foodID[0]}`)
                    db.query(`select restaurant_id from food where food_id = ${foodID[0].food_id}`, (err, restaurantID) => {
                        if (err) {
                            console.log(err)
                            console.log("from restaurant select")
                            result(err, null)
                        }
                        else {
                            console.log(restaurantID[0])
                            db.query(`update billstatus set restaurant_id = ${restaurantID[0].restaurant_id} where bill_id = ${id}`, (err, results) => {
                                if (err) {
                                    console.log(err)
                                    console.log('from restaurant update')
                                    result(err, null)
                                }
                                else {
                                    console.log(`restaurant id updated, id it ${restaurantID[0].restaurant_id}`)
                                    result(null, results[0]);
                                }
                            })
                        }
                    })
                }
            })

          
        }
    });
};

// get all Bills Status
export const getBillsByUser = (id, result) => {
    db.query("SELECT * FROM billstatus WHERE user_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results);
        }
    });
};


// get all Bills by bill Status
export const getBillsByBill = (id, result) => {
    db.query("SELECT * FROM billstatus WHERE bill_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results);
        }
    });
};

// get all Bills Status
export const getAll = (result) => {
    db.query("SELECT * FROM billstatus", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results);
        }
    });
};

// get all restaurant Bills Status
export const getRestaurantsBillsAll = (resturant_id, result) => {
    db.query(`SELECT * FROM billstatus WHERE restaurant_id = ${resturant_id}`, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results);
        }
    });
};

//update the status
export const updateStatus = (id, result) => {
    db.query("UPDATE billstatus SET bill_status = bill_status + 1  WHERE bill_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const updatePaid = (id, result) => {
    db.query("UPDATE billstatus SET bill_paid = 'true' WHERE bill_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const cancelStatus = (id, result) => {
    db.query("UPDATE billstatus SET bill_status = 0  WHERE bill_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
    db.query("UPDATE billstatus SET bill_paid = 'false' WHERE bill_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
    });
};

// CONFIRM ORDER
export const confirmReceivedFood = (id, result) => {
    db.query("UPDATE billstatus SET user_confirm = 1 WHERE bill_id = ?", id, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// ASSIGN ORDER
export const assignOrderToDriver = (data, result) => {
    db.query(`UPDATE billstatus SET driver_id = ${data.driver_id} WHERE bill_id = ${data.bill_id}`, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};