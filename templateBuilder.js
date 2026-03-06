const fs = require('fs');
const people = require('./people.js');

const template = `
module.exports = {
    appetizers: [],
    peopleSplittingAppetizers: [ // Leaving this empty will split the appetizers between everyone

    ],
    meals: ${JSON.stringify(people.map(person => ({
        name: person,
        food: []
    })), undefined, 4).replace(/"([^"]+)":/g, '$1:')},
    subtotal: 0,
    tax: 0,
    tip: 0,
    total: 0 // subtotal + tax + tip
};
`
fs.writeFile('./receipt.js', template, (error) => {
    if (error) {
        console.error(error);
    }
});
