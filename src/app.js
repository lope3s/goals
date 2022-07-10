const startDb = require('./database/config')
const {readUserInput, getProgress} = require('./helpers')
const {Goals, History} = require('./database/models')

/*
    [x] create goal
    [x] add history entry
    [x] list goals
          filters:
            [x] index: list all goals, if is completed, shows a text completed,
            [x] completed: list only the completed goals,
            [x] onGoing: list only the on going goals and the completed percentage

    next steps:
    [] create a function to only count progress when the days are consecutive
    [] when the progress gets the goalInDays mark, change the isCompleted to true
    [] in the makeProgress function, add another field that counts only the consecutive days
*/

if (process.argv.length < 3) {
    console.error("Usage: <action>")
    return
}

if(process.argv.at(2) === 'list' && process.argv.length < 4) {
    console.error("Usage list --<option>")
    return
}

async function main() {
    try {
        await startDb()

        const [processExecPath, jsPath, action] = process.argv

        if (action === 'create') {
            const obj = await readUserInput(['name', 'goalInDays'])
            await Goals.create(obj)
            return console.log(`Sucessfuly registered goal ${obj.name}`)
        }

        if (action === 'entry') {
            const obj = await readUserInput(['goal_id', 'week_day_id'])
            await History.create(obj)
            return console.log('Sucessfuly registered entry')
        }

        if (action === 'list') {
            const option = process.argv.at(-1)

            if (option === '--i') {
                const goals = await Goals.findAll({
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    include: {
                        model: History,
                        as: 'history'
                    }
                })
               
                return console.table(getProgress(goals))
            }

            if (option === '--c' || option === '--o') {
                const goals = await Goals.findAll({
                    where: {isCompleted: option === '--c' ? true : false},
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    include: {
                        model: History,
                        as: 'history'
                    }
                })
               
                return console.table(getProgress(goals))
            }

            return console.error('Usage: list <--i | --c | --o>')
        }

        return console.error('Usage: <create | entry | list>')
    } catch (error) {
        console.error(error)
    }
}

if (require.main === module) {
    main()
}