const readline = require('readline')

const getUserInput = (fieldName) => new Promise((resolve, reject) => {
    try {
        const line = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          })

          line.question(`${fieldName}: ` , asnwer => {
            line.close()
            resolve(asnwer)
          })

    } catch (error) {
        reject(error)
    }
})

const readUserInput = async (fields) => {

    const obj = {}

    for(const fieldName of fields) {
        const value = await getUserInput(fieldName)

        obj[fieldName] = value
    }

    return obj
}

module.exports = readUserInput