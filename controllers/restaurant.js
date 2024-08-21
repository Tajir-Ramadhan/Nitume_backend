import {
    updateRestaurant,
    getRestaurantById,
    insertRestaurant
} from "../models/RestaurantModel.js";

//Update restaurant
export const updateRes = (req, res, next) => {
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        id: req.body.id
    }
    updateRestaurant(data, (err, result) => {
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

//get restaurant
export const getRestaurant = (req, res) => {
    let id = req.params.id
    console.log(`get restaurant reached, ${id} found`)
    getRestaurantById(id, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
        else {
            console.log(result)
            res.json(result)
        }
    })
}

//register restaurant
export const registerRestaurant = (req, res) => {
    insertRestaurant(req.body.name, req.body.address, req.body.phone, req.userData.userId, req.body.registered_when)
    .then(
        (result) => {
            console.log(result)
            res.status(201).json({message: "restaurant registered"})
        }
    )
    .catch(
        (err) => {
            console.log(err)
            res.status(500).json({ error: err })
        }
    )
}