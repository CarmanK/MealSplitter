module.exports = {
    appetizers: [
        10.50, 3.50, 9.95, 2.95
    ],
    peopleSplittingAppetizers: [ // Leaving this empty will split the appetizers between everyone

    ],
    meals: [{
        name: 'kevin',
        food: [9, 14.95, 8]
    }, {
        name: 'sammi',
        food: [6, 14.5, 4.75, 7.75]
    }, {
        name: 'kyle',
        food: [9, 14.95, 7]
    }],
    subtotal: 122.80,
    tax: 4.56,
    tip: 25,
    total: 152.36 // subtotal + tax + tip
}
