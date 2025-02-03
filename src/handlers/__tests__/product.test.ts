import request from "supertest";
import server from "../../server";
import { reset } from "colors";


describe('POSt /api/products', ()=>{
    // test todos los campos estan vacios
    it('should display validation errors', async()=>{
        const response = await request(server).post('/api/products').send()
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    //test validacion precio mayor que 0
    it('should validate that the price is greater than 0', async()=>{
        const response = await request(server).post('/api/products').send({    
            name : "monitor curvo",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    //test validacion que el precio sea un numero
    it('should validate that the price is a type number', async()=>{
        const response = await request(server).post('/api/products').send({    
            name : "monitor curvo",
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(1)
    })
    
    
    //prueba para el metodo Post
    it('should create a new product', async()=>{
        const response = await request(server).post('/api/products').send({
        
            name :"Mouse-testing",
            price : 50      
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

//test de validacion de GET
describe('GET /api/products', ()=>{
    it('should checkt if api/products Url exists', async()=>{
        const responsive = await request(server).get('/api/products')
        expect(responsive.status).not.toBe(404)
    })

    it('GET a JSON response with products', async()=>{
        const responsive = await request(server).get('/api/products')

        expect(responsive.status).toBe(200)
        expect(responsive.headers['content-type']).toMatch(/json/)
        expect(responsive.body).toHaveProperty('data')
 
        expect(responsive.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', ()=>{
    it('should return a 404 response for a non-existent product', async()=>{
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`).send()

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })
    it('should check a valid ID in the url', async()=>{
        const response = await request(server).get('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    })
    it('get a JSON response for a single product', async()=>{
        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', ()=>{
    it('should check a valid ID in the url', async()=>{
        const response = await request(server)
                                .put('/api/products/not-valid-url')
                                .send({
                                        name : "Monitor",
                                        availability : true,
                                        price: 120
                                })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })
    it('should display validation error messages when aupdating a product', async()=>{
        const response = await request(server).put('/api/products/1').send({})
        
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)
    })
    it('should validate that price is greater than 0', async()=>{
        const response = await request(server).put('/api/products/1').send({
            
            name : "Monitor",
            availability : true,
            price: 0
              
        })
        
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El Valor tiene que ser mayor que 0')

        expect(response.status).not.toBe(200)
        expect(response.body.errors).not.toHaveLength(0)
    })
    it('should return a 404 response for a non-existent product', async()=>{
        const productID= 2000
        const response = await request(server).put(`/api/products/${productID}`).send({
            
            name : "Monitor",
            availability : true,
            price: 300
              
        })
        
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Producto no encontrado")
      

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("data")
        
    })
    it('should update an existing product with valid data', async()=>{

        const response = await request(server).put(`/api/products/1`).send({
            
            name : "Monitor",
            availability : true,
            price: 300
              
        })
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
      

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
        
    })
})

describe('PATCH /api/products/:id', ()=>{
    it('should return a 404 response for non-exist product', async ()=>{
        const productID = 2000
        const response = await request(server).patch(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)

        
    })
    it('should update the product availability', async()=>{
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')

    })
})

describe('DELETE /api/produts/:id', ()=>{
    it('should check validate ID', async ()=>{
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
        
    })
    it('should return a 404 response for a non-exist product', async ()=> {
        const productID= 200 
        const response = await request(server).delete(`/api/products/${productID}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.status).not.toBe(200)

    })
    it('should delete a product', async ()=>{
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})