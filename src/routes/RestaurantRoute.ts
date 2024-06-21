import  express from "express"
import { param } from "express-validator"

import RestaurantController from "../controllers/RestaurantController"


const router= express.Router()


router.get("/:restaurantId",param("restuarantId").isString().trim().notEmpty()
.withMessage("City param must be a String"),RestaurantController.getRestaurant)


router.get("/search/:city",param("city").isString().trim().notEmpty().withMessage("City param must be a String"),
RestaurantController.searchRestaurant
)

export default router