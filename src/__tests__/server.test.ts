
import {dbConnect} from "../server";
import db from "../config/db";



jest.mock('../config/db')

describe('dbConnect', ()=>{
    it('should handle database connection error', async ()=>{
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un Error al conectar la DB'))
        const consoleSpy = jest.spyOn(console,'log')

        await dbConnect()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un Error al conectar la DB')
        )
    })
})
