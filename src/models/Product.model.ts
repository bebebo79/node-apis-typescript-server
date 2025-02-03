import { Table, Column, Model, DataType,Default} from 'sequelize-typescript'

// nombramos la tabla
@Table({
    tableName : 'products'
})



// nombramos las columnas y les definimos el type
class Products extends Model {
    @Column({
        type : DataType.STRING(100)
    })
    declare name : string

    @Column({
        type: DataType.FLOAT(6,2)
    })
    declare price:number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability : boolean
}

export default Products