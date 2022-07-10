const {Goals, WeekDays, History} = require('./models')
const {Sequelize} = require('sequelize')
const {join} = require('path')

const models = [
    Goals,
    WeekDays,
    History
]

async function startDb() {
    try {
        const db = new Sequelize(
            `sqlite::${join(__dirname, '../../db.sqlite')}`, 
            {logging: false}
        )

        await Promise.all(models
            .map(model => model.init(db))
            .map(model => {
                if (model.associate) 
                    model.associate(db.models)

                model.sync()
            })
        )

        const weekDays = await WeekDays.findAll()

        if (!weekDays.length) {
            await WeekDays.bulkCreate([
                {
                    name: 'Monday'
                },
                {
                    name: 'Tuesday'
                },
                {
                    name: 'Wednesday'
                },
                {
                    name: 'Thursday'
                },
                {
                    name: 'Friday'
                },
                {
                    name: 'Saturday'
                },
                {
                    name: 'Sunday'
                }
            ])
        }

    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

module.exports = startDb