// import connection
import db from "../config/database.js";

// get all user
export const getAllUser = (result) => {
    db.query("SELECT * FROM Users", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};


// get single user
export const getUserByEmail = (data,result) => {
    
    db.query("SELECT user_id, user_name, user_password,user_email, role FROM Users WHERE user_email = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

// get single user
export const getUserByID = (result) => {
    
    db.query("SELECT user_name, user_email,user_id FROM Users", (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};
// insert User
export const insertUser = (data,result) => {
    db.query("INSERT INTO Users SET ?",data, (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results);
        }
    });
};

//update user
/**
 * @function updateUser() takes two parametter
 * @param email from the req.body
 * @param data as req.body
*/
export const updateUser = ( data, result) => {
    console.log(data)
    db.query(`UPDATE Users SET user_name = '${data.name}', user_phone = '${data.phone}', user_birth = '${data.birth}', user_address = '${data.address}' WHERE user_email = '${data.email}'`, (err, results) => {
        if(err) {
            console.log(err)
            result(err, null);
        }
        else{
            result(null, results[0])
        }
    })
}

//get user to update
export const updatedUserData = (data,result) => {
    
    db.query("SELECT user_name,user_email, role, user_phone, user_birth, user_address FROM Users WHERE user_email = ?",[data], (err,results)=> {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    });
};

//update password
export const updatePassword = (data, result) => {
    db.query(`UPDATE Users SET user_password = '${data.password}' WHERE user_email = "${data.email}"`, (err, results) => {
        if (err){
            console.log(err);
            result(err,null);
        }else{
            result(null,results[0]);
        }
    })
}




