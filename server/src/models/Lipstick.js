module.exports = (sequelize, DataTypes) => {
    const Lipstick = sequelize.define('Lipstick', {
        pictures: DataTypes.STRING,  
        name: DataTypes.STRING,
        color: DataTypes.STRING,
        type: DataTypes.STRING,
        brand: DataTypes.STRING,   
        price: DataTypes.STRING,
    })
    return Lipstick

}