const katya = require('./katya')


const deepCopy = obj => JSON.parse(JSON.stringify(obj))

test('generates new array with a field and does not change the old one', () => {
    let users = [
        { name: 'John', id: 23 },
        { name: 'Elizabeth', id: 43 },
        { name: 'Steve', id: 54 },
        { name: 'Seth', id: 89 },
        { name: 'Morgan', id: 55 },
        { name: 'Will', id: 12 }
    ]

    let usersCopy = deepCopy(users)

    let newArr = katya.newArrayWithField(users)

    expect(newArr).toEqual(expect.arrayContaining([expect.objectContaining({userType: 'customer'})])) 

    expect(users).toEqual(usersCopy)
})


let pairs = [
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
    ['key4', 'value4'],
    ['key5', 'value5'],
    ['key6', 'value6'],
]

const pairsCopy = deepCopy(pairs)

let objFromPairs = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
    key4: 'value4',
    key5: 'value5',
    key6: 'value6'
}

const objFromPairsCopy = deepCopy(objFromPairs)

test('generates an object from an array of pairs', () => {
    const obj = katya.fromPairs(pairs)

    expect(obj).toEqual(objFromPairs)

    expect(pairsCopy).toEqual(pairs)
})


test('generates pairs array from object', () => {
    const pairsFromObject = katya.toPairs(objFromPairs)

    expect(pairsFromObject).toEqual(pairs)

    expect(pairs).toEqual(pairsFromObject)
})

test('generates an object from array with a keyby function', () => {
    const arr = [
        {name: 'vasiliy', age: 25},
        {name: 'gregoriy', age: 28},
        {name: 'alexander', age: 322},
        {name: 'katerina', age: 21},
        {name: 'taxi driver', age: 20},
        {name: 'taxi driver2', age: 20},
    ]

    const arrByAge = {
        25: {name: 'vasiliy', age: 25},
        21: {name: 'gregoriy', age: 28},
        322: {name: 'alexander', age: 322},
        21: {name: 'katerina', age: 21},
        20: {name: 'taxi driver', age: 20},
    }

    const newArrByAge = katya.keyBy(arr, it => it.age)

    expect(newArrByAge).toEqual(arrByAge)

    const arrByNameForPeopleOlderThan21 = {
        vasiliy: {name: 'vasiliy', age: 25},
        gregoriy: {name: 'gregoriy', age: 28},
        alexander: {name: 'alexander', age: 322},
    }

    const newArrByNameForPeopleOlderThan21 = katya.keyBy(arr, it => it.age > 21 ? it.name : undefined)

    expect(arrByNameForPeopleOlderThan21).toEqual(newArrByNameForPeopleOlderThan21)
})