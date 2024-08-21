import { userRating } from "../models/RatingModel.js";

export const rating = (req, res) => {

    userRating(req.body.bill_id, req.body.rating, req.body.comment, req.body.user_id)
      .then(
        (result) => {
          console.log(`Menu rated successfuly, The rating id is ${result.insertId}`)
          res.status(200).json({ success: true, message: `Rated successfuly` })
        }
      )
  
      .catch(
        (err) => {
            console.log(err)
            res.status(500).json({ error: err })
        }
      )
}