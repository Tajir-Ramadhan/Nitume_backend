// import functions from User model

import {
    getAllUser,
    getUserByEmail,
    insertUser,
    updateUser,
    updatedUserData,
    updatePassword,
    getUserByID
} from "../models/UserModel.js";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
//import password generator
//import { passwordGenerator } from "../lib/passwordUtils.js";

// get all Users
export const allUsers = (req, res) => {
    getAllUser((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


// get single user
export const showAUser = (req, res) => {
    getUserByEmail(req.params.email, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get single user by id
export const showAUserviaId = (req, res) => {
    getUserByID((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


// /**
//  * @function getUserInfo() retrives all user data from the database and sent them back to the user
// */
// export const getUserInfo = (req, res) => {

//     getUserByEmail(req.user.user_email, (err, user) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.json(user);
//         }
//     });
// };

export const login = (req, res) => {
    getUserByEmail(req.body.user_email, (err, user) => {
        if (!user) {
            console.log(err)
            console.log(req.body)
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }

        else {
            bcrypt.compare(req.body.user_password, user.user_password, (err, result) => {
                if (err) {
                    console.log(err)
                    console.log(req.body)
                    console.log(user.user_password)
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        // Payload
                        {
                            email: user.user_email,
                            userId: user.user_id,
                            role: user.role
                        },
                        // Secret
                        "I love coding",
                        // Options
                        {
                            expiresIn: "1h"
                        },
                    );

                    const returnObject = {
                        message: 'Auth successful',
                        token,
                        user: { role: user.role, email: user.user_email, user_id: user.user_id, user_name: user.user_name }
                    }
                    console.log(returnObject)

                    return res.status(200).json(returnObject)

                } else {
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                }
            })

        }

    });
}

/**
 * create account
*/
export const signUp = (req, res, next) => {
    console.log(req.body)
    getUserByEmail(req.body.user_email, (result, err) => {
        console.log(result)
        if (result) {
            return res.status(409).json({
                message: 'Mail exists'
            })
        } else {
            req.body.user_password
            bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    console.log(hash)
                    let data = req.body;
                    data.user_password = hash

                    insertUser(data, (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        } else {
                            res.json(result);
                        }
                    });

                }
            })
        }
    })
}


//update user details
export const updateProfile = (req, res, next) => {

    let email = req.body.user_email;
    console.log(email)
    let password = req.body.user_password

    if (password) {
        console.log("having password")
        bcrypt.hash(req.body.user_password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                console.log(hash)
                let data = {
                    name: req.body.user_name,
                    email: req.body.user_email,
                    phone: req.body.user_phone,
                    birth: req.body.user_birth,
                    address: req.body.user_address
                }
                // data.user_password = hash

                updateUser(data, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    } else {
                        let payload = {
                            password: hash,
                            email: data.email
                        }
                        console.log(result)
                        updatePassword(payload, (err, result) => {
                            if (err) {
                                console.log(err)
                                res.status(500).json({ error: err })
                            }
                            else {
                                console.log(result)
                                res.status(201).json({
                                    message: 'Info updated'
                                })
                            }
                        })

                    }
                });

            }
        })
    }
    else {
        console.log("Haina password")
        let data = {
            name: req.body.user_name,
            email: req.body.user_email,
            phone: req.body.user_phone,
            birth: req.body.user_birth,
            address: req.body.user_address
        }

        updateUser(data, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            } else {
                console.log(result)
                res.status(201).json({
                    message: 'Info updated'
                })
            }
        })
    }


}

//uset to update
export const getUserToUpdate = (req, res) => {
    updatedUserData(req.params.email, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};




