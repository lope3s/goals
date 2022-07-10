const makeProgress = (goal) => {
    const {history, ...rest} = goal.dataValues

    rest.days = history.length
    rest.progress = `${((history.length / rest.goalInDays).toFixed(2) * 100)}%`

    return rest
}

const getProgress = (goals) => {
    return goals.map(goal => makeProgress(goal))
}

module.exports = getProgress