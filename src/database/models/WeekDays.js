const {DataTypes, Model} = require('sequelize')

class WeekDays extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            tableName: 'week_days' 
        })

        return this
    }
}

module.exports = WeekDays