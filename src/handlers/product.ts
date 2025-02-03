import { Request, Response} from 'express'
import Products from '../models/Product.model'
import { param } from 'express-validator'


//** GET */
export const getProducts = async (req:Request, res:Response)=>{
    const products = await Products.findAll({
        order:[
            ['id', 'DESC']
        ]
    })
    res.json({data :products})
}
export const getProductById = async (req:Request, res:Response)=>{
    const {id} = req.params
    const product = await Products.findByPk(id)
    
    if(!product) {
        res.status(404).json({error:'Producto no encontrado'})
        return         
    }

    res.json({data:product})
 
}


//** POST */
export const createProduct =async (req : Request, res: Response)=>{
    const product = await Products.create(req.body)
    res.status(201).json({data : product})
    
   
}

//*** PUT  */
export const updateProduct =async (req : Request, res: Response)=>{
        const {id} = req.params
        const product = await Products.findByPk(id)
        //comprobar que el producto existe
        if(!product) {
            res.status(404).json({error:'Producto no encontrado'})
            return         
        }
        //actualizar
        await product.update(req.body)
        await product.save()

        res.json({data:product})
    
   
}

//**** PATCH */
export const updateAvailability=async (req : Request, res: Response)=>{
    const {id} = req.params
    const product = await Products.findByPk(id)
    //comprobar que el producto existe
    if(!product) {
        res.status(404).json({error:'Producto no encontrado'})
        return         
    }
    //actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data:product})


}

//** DELETE */
export const deleteProduct = async ( req:Request, res: Response) =>{
    const {id} = req.params
    const product = await Products.findByPk(id)
    //comprobar que el producto existe
    if(!product) {
        res.status(404).json({error:'Producto no encontrado'})
        return         
    }

    await product.destroy()
    res.json({data:'Producto Eliminado'})
     
   
}