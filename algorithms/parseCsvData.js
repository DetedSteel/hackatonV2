const path = require('node:path')

class trip {
    constructor(startTown, finishTown, date, typeTransportation) {
        this.startTown = startTown
        this.finishTown = finishTown
        this.date = date
        this.typeTransporation = typeTransportation
    }
}

const fs = require('node:fs')
const parsedData = []
const dirnameTmp = __dirname.split(path.sep)

let newDir = []
for(let i = 0; i < dirnameTmp.length - 1; ++i){
    newDir.push(dirnameTmp[i])
}
newDir.push('csvData')
let newPath = path.join(...newDir, 'DATA.csv')
console.log(newPath)
const file = new Buffer(fs.readFileSync(newPath)).toString()
let lines = file.split('\n')
delete lines[0]
const IterateLength = lines.length - 1
for (let i = 1; i < IterateLength; ++i) {
    const str = lines[i]
    // console.log(i)
    const info = str.split(';')
    const dateInfo = info[3].split('.')
    // console.log(dateInfo)
    const obj = {
        startTown: info[1],
        finishTown: info[2],
        dateRussianString: info[3],
        date: new Date(+dateInfo[2], +dateInfo[1] - 1, +dateInfo[0] + 1),
        // dateTemp: new Date(2023, 3, 2),
        typeTransportation: info[5].slice(0, info[5].length - 1)
    }
    parsedData.push(obj)
}

// console.log(parsedData)
module.exports = parsedData