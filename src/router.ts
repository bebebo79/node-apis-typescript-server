import { Router} from  'express'
import { createProduct,deleteProduct,getProductById,getProducts, updateAvailability, updateProduct } from './handlers/product'
import {body, param} from 'express-validator'
import { handleInputErrors } from './middleware'


const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      desciption: the Produdt ID    
 *                      example: 1
 *                  name:
 *                      type: string
 *                      desciption: the Produdt name   
 *                      example: Monitor curvo de 20 pulgadas
 *                  price:
 *                      type: number
 *                      desciption: the Product price  
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      desciption: the Product availability  
 *                      example: true       
 * 
 * 
 */




//****** GET ********/

/**
 * @swagger
 * /api/products:
 *      get:    
 *          summary : Get a List of products
 *          tags:   
 *              - Products
 *          description : Return a list of products
 *          responses:
 *                200:  
 *                    description: Successful response
 *                    content: 
 *                          application/json:
 *                                  schema:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */     
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description : Return a product based on its unique ID
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retriver
 *              required : true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content: 
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Product'
 *                  
 *              404:
 *                   description: Not Found
 *              400:
 *                   description: Bad request - Invalid ID
 * 
 *
 */


router.get('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),    
    handleInputErrors,        
    getProductById
)



//******** POST  ******/

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new Product
 *      tags:
 *          - Products
 *      description: Retuns a new record in the database
 *      requestBody:        
 *          required: true
 *          content:    
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                             example: "Monitor curvo de 49 pulgadas"
 *                          price:
 *                             type: number
 *                             example: 300       
 *      responses:
 *          201:
 *              description: Created Product successfuly
 *              content: 
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid input data 
 */



router.post('/', 
    //validacion
        body('name')
            .notEmpty().withMessage('El Nombre no puede ir vacio'),
        body('price')
            .isNumeric().withMessage('El valor introducido no es valido')
            .notEmpty().withMessage('El Nombre no puede ir vacio')
            .custom(value => value > 0).withMessage('El Valor tiene que ser mayor que 0'),
        handleInputErrors,
        createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags:
 *          - Products
 *      description: Return the updated product
 *      parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retriver
 *              required : true
 *              schema:
 *                  type: integer
 *      requestBody:        
 *          required: true
 *          content:    
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                             example: "Monitor curvo de 49 pulgadas"
 *                          price:
 *                             type: number
 *                             example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:        
 *              description : Successful response
 *              content: 
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *                      
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product not Found    
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
//******* PUT */
router.put('/:id',
    param('id')
        .isInt().withMessage('ID no valido'), 
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('El valor introducido no es valido')
        .notEmpty().withMessage('El Nombre no puede ir vacio')
        .custom(value => value > 0).withMessage('El Valor tiene que ser mayor que 0'),
    body('availability')
        .isBoolean().withMessage('El valor introducino no es valido'),
    handleInputErrors, 
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product Availability
 *      tags:
 *          - Products
 *      description: Return the updated availability
 *      parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retriver
 *              required : true
 *              schema:
 *                  type: integer
 * 
 *      responses:
 *          200:        
 *              description : Successful response
 *              content: 
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *                      
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Product not Found
 *          
 * 
 * 
 * 
 * 
 */

/****** PATCH */
router.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,     
    updateAvailability
)
/**
 * @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Deleted a product by a give ID
 *          tags:       
 *              - Products
 *          description: Returns a confirmation message
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to deleted
 *              required : true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description : Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: Producto Eliminado
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product not Found 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

/***** DELETE */
router.delete('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'), 
    handleInputErrors,    
    deleteProduct)

export default router