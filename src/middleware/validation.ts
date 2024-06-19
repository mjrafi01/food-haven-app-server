import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from "express-validator";



const handleValidationError =async (req:Request, res:Response,next:NextFunction) => {

    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error:errors.array()})
        
    }
    next()
}

export const validateMyUserRequest=[


    body("name").isString().notEmpty().withMessage("Name Must Be a String"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 Must Be a String"),
    body("city").isString().notEmpty().withMessage("city Must Be a String"),
    body("country").isString().notEmpty().withMessage("city Must Be a String"),
    handleValidationError
    
]