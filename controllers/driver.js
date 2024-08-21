import { registerRestaurantDriver, getDriverOrders, getDriverdetails, updateUser, getDriverByRestaurant } from "../models/DriverModel.js";

export const registerDriver = (req, res) => {
    let restaurant_id = req.body.restaurant_id
    let user_id = req.body.user_id

    registerRestaurantDriver(restaurant_id, user_id)
        .then(
            (result) => {
                console.log(result)
                res.status(201).json({
                    message: 'Driver registered'
                })
            }
        )
        .catch(
            (err) => {
                console.log(err)
                res.status(500).json({ err: err })
            }
        )

}

// get Bills Status
export const dirverOrders = (req, res) => {
    getDriverOrders(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// export const dirverOrders = (req, res, next) => {
//     /**
//      * Where to render the driver page and otehr properties
//      * 
//      * button to register restaurants 
//     */
//     getDriverOrders(req.params.id)
//         .then(
//             (orders) => {
//                 if (orders) {
//                     //res.status(200).json({success: true, message: `Your orders are ${JSON.stringify(orders)}`})
//                     console.log(orders)
//                     res.json(orders)

//                 }
//                 else {
//                    res.status(200).json({message: "no orders yet"})
//                 }
//             }
//         )


// }

//collecting driver information
export const driverDetails = (req, res, next) => {
    /**
     * Where to render the driver page and otehr properties
     * 
     * button to register restaurants 
    */
    getDriverdetails(req.params.id)
        .then(
            (driver) => {
                if (driver) {
                    //res.status(200).json({success: true, message: `Your orders are ${JSON.stringify(orders)}`})
                    res.json(driver)

                }
                else {
                    res.status(200).json({ message: "no orders yet" })
                }
            }
        )


}

export const updateDriver = (req, res) => {
    let data = {
        lincence_number: req.body.lincence_number,
        vehicle_number: req.body.vehicle_number,
        driver_id: req.body.driver_id
    }
    updateUser(data, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({err: err}
            )
        }
        else{
            res.json(result)
        }
    })
}

//use restaurant id to find the driver
export const getDriverByRestaurantId = (req, res, next) => {
    /**
     * Where to render the driver page and otehr properties
     * 
     * button to register restaurants 
    */
    getDriverByRestaurant(req.params.id)
        .then(
            (driver) => {
                if (driver) {
                    //res.status(200).json({success: true, message: `Your orders are ${JSON.stringify(orders)}`})
                    res.json(driver)

                }
                else {
                    res.status(200).json({ message: "no orders yet" })
                }
            }
        )


}