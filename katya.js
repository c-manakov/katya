const newArrayWithField = arr => arr.map(it => ({...it, userType: 'customer'}))

module.exports = {newArrayWithField}