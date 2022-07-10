const {Model, DataTypes} = require('sequelize')

class Goals extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            goalInDays: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            isCompleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'goals'
        })

        return this
    }

    static associate(models) {
        this.hasMany(models.History, {
            foreignKey: 'goal_id',
            as: 'history'
        })
    }
}

module.exports = Goals