import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req:Request,res:Response, next:NextFunction):void => {
    
    // array de errores de validacion
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors : errors.array()})
        return
    }

    
    next()
};