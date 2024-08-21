// import express 
import express from "express";


// import auth middleware
import checkAuth  from '../middleware/checkAuth.js'
// import functions from controller 
import {
    showFoods,
    showFoodById,
    createFood,
    updateFood,
    deleteFood,
    showFoodByRestaurant
} from "../controllers/food.js";

import {
    showAUser,
    signUp,
    login,
    getUserToUpdate,
    updateProfile,
    showAUserviaId
} from "../controllers/user.js";

import {
    addItems,
    getItem,
    updateItem,
    allItems,
    deleteItem,
    deleteItems
} from "../controllers/cart.js";

import {
    createBooking
} from "../controllers/booktable.js";

import {
    createBillDetails,getBillDetailsById
} from "../controllers/billdetails.js";

import {
    showNewestStatusId,
    createBillStatus, 
    getAllBillsByUser,
    getAllBillsByBill,
    getAllBills,
    updateBillStatus,
    updateBillPaid,
    cancelBillStatus,
    confirmOrder,
    assignDriver,
    getAllRestaurantBills,
} from "../controllers/billstatus.js";

//RESTAURANTS
import { updateRes,
    getRestaurant,
    registerRestaurant
 } from "../controllers/restaurant.js";

 //RATINGS
 import { rating } from "../controllers/rating.js";

 //DRIVER
 import { registerDriver, dirverOrders, driverDetails, updateDriver, getDriverByRestaurantId } from "../controllers/driver.js";

// init express router
const router = express.Router();

////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/foods", showFoods);

// get single Food 
router.get("/api/foods/:id", showFoodById);

//get restaurant foods
router.get('/api/restaurant/food/:id', checkAuth, showFoodByRestaurant)

// create Food
router.post("/api/food/register" ,createFood);

// update Food 
router.put("/api/foods/:id",checkAuth ,updateFood);

// delete Food
router.delete("/api/foods/:id",checkAuth ,deleteFood);



////////////////////////// USER ////////////////////////////////
//login
router.post("/api/user/login/", login, (req) =>{console.log(req.body)})
// get all user
router.get("/api/users/:email", showAUser);
router.get('/api/users/', showAUserviaId)


// create account
router.post("/api/users/register/", signUp);

//UPDATE
router.get('/api/users/update/:email', checkAuth, getUserToUpdate)
router.post("/api/user/update", checkAuth, updateProfile)


////////////////////////// RESTAURANT ////////////////////////////////
//Register res
router.post('/api/restaurants/register', checkAuth, registerRestaurant)

//get restaurant
router.get('/api/restaurants/:id',  getRestaurant)

//update restaurant
router.post('/api/restaurants/update', checkAuth, updateRes)


////////////////////////// CART ////////////////////////////////
// add to cart
router.post("/api/cartItem", addItems);

// get a item in cart
router.get("/api/cartItem/:user_id/:food_id",checkAuth ,getItem);

// get all items by user id
router.get("/api/cartItem/:id",checkAuth ,allItems);

// update item qty
router.put("/api/cartItem/", updateItem);

// delete a item in cart
router.delete("/api/cartItem/:user_id/:food_id",checkAuth ,deleteItem);

// delete all items in cart
router.delete("/api/cartItem/:id",checkAuth , deleteItems);



////////////////////////// Booking ////////////////////////////////
router.post("/api/booking", createBooking);



////////////////////////// Bill Details ////////////////////////////////
router.post("/api/billdetails",checkAuth ,createBillDetails);
router.get("/api/billdetails/:id", getBillDetailsById);



////////////////////////// Bill Status ////////////////////////////////
router.get("/api/billstatus/new",checkAuth ,showNewestStatusId);
router.post("/api/billstatus",checkAuth ,createBillStatus);
router.get("/api/billstatus/user/:id",checkAuth ,getAllBillsByUser);
router.get("/api/billstatus/bill/:id",checkAuth ,getAllBillsByBill);
router.get("/api/billstatus",checkAuth ,getAllBills);
router.put("/api/billstatus/:id" ,updateBillStatus); //admin rauter failed to send tokens
router.put("/api/billstatus/paid/:id",checkAuth ,updateBillPaid);
router.put("/api/billstatus/cancel/:id",checkAuth ,cancelBillStatus);
router.post('/api/billstatus/confirm/:id', confirmOrder);

////////////////////////// Bill Status Admin ////////////////////////////////
router.get('/api/admin/billstatus', checkAuth, getAllBills);
router.get('/api/admin/billstatus/restaurant/:id', checkAuth, getAllRestaurantBills )
router.get('/api/admin/billstatus/:id', checkAuth, updateBillStatus)
router.get('/api/admin/billstatus/paid/:id', checkAuth, updateBillPaid)
router.get('/api/admin/billstatus/cancel/:id', checkAuth, cancelBillStatus)

///////////////////////////////RATINGS///////////////
//user rating
router.post('/api/rating/', rating)

////////////////////////// driver ////////////////////////////////
router.post('/api/drivers/register', checkAuth, registerDriver)
router.get('/api/driver/billstatus/:id', checkAuth, dirverOrders);
router.get('/api/driver/details/:id', checkAuth, driverDetails)
router.post('/api/driver/update/', checkAuth, updateDriver)
//selecting drivers for delivery
router.get ('/api/drivers/all/:id',  getDriverByRestaurantId)
router.post('/api/driver/assign/', assignDriver);





// export default router
export default router;








