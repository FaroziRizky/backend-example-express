module.exports = (sequelize, DataTypes) =>{
    const Animals = sequelize.define('Animals', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          namaLocal: {
            type: DataTypes.STRING,
            allowNull: false
          },
          namaLatin: {
            type: DataTypes.STRING,
            allowNull: false
          },
          habitat: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.TEXT,
          },
          longitude: {
            type: DataTypes.CHAR,
            allowNull: false
          },
          latitude: {
            type: DataTypes.CHAR,
            allowNull: false
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
    },{
        tableName: 'animals'
    });
    
    return Animals
}