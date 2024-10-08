module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        pictures: DataTypes.STRING,  
        name: DataTypes.STRING,
        color: DataTypes.STRING,
        type: DataTypes.STRING,
        brand: DataTypes.STRING,   
        price: DataTypes.STRING,
    })
    return Blog

}