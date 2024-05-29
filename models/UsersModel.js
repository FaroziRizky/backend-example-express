module.exports = (Sequelize, DataTypes) =>{
    const Users = Sequelize.define('Users', {
          userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: false
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          picture: {
            type: DataTypes.STRING,
          },
          refreshToken: {
            type: DataTypes.TEXT,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
    },{
        tableName: 'users'
    });
    

    return Users
}