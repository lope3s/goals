const { DataTypes, Model } = require('sequelize')

class History extends Model {
    static init(sequelize) {
        super.init({
            goal_id: {
                type: DataTypes.INTEGER,
                references: {model: 'goals', key: 'id'},
                allowNull: false
            },
            week_day_id: {
                type: DataTypes.INTEGER,
                references: {model: 'week_days', key: 'id'},
                allowNull: false
            }
        }, {
            sequelize, 
            tableName: 'history'
        })

        return this
    }
}

module.exports = History