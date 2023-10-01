const { appetizers, peopleSplittingAppetizers, meals, tax, tip, subtotal, total } = require('./receipt.js');

const appetizersRawTotal = appetizers.reduce((partialSum, a) => partialSum + a, 0);
const numberOfPeopleSplittingAppetizers = peopleSplittingAppetizers.length || meals.length;
const namesOfPeopleSplittingAppetizers = peopleSplittingAppetizers.length ? peopleSplittingAppetizers : meals.map(meal => meal.name);

const peopleTotals = {};
for (let meal of meals) {
    peopleTotals[meal.name] = {
        foodTotal: meal.food.reduce((partialSum, a) => partialSum + a, 0),
        food: meal.food
    };
}

let rawTotal = appetizersRawTotal; // Before tax and tip
for (const person of Object.keys(peopleTotals)) {
    rawTotal += peopleTotals[person].foodTotal;
}

for (const person of Object.keys(peopleTotals)) {
    const portion = peopleTotals[person].foodTotal / rawTotal;
    peopleTotals[person].tax = portion * tax;
    peopleTotals[person].tip = portion * tip;
}

const appetizersPortion = appetizersRawTotal / rawTotal;
const appetizersTax = appetizersPortion * tax;
const appetizersTip = appetizersPortion * tip;
const appetizersTotal = appetizersRawTotal + appetizersTax + appetizersTip;

// Check total
const testTotal = subtotal + tax + tip;
if (testTotal.toFixed(2) !== total.toFixed(2)) {
    throw new Error(`testTotal does not add up: expected ${total} vs. actual ${testTotal}`)
}

// Check subtotal
if (rawTotal.toFixed(2) !== subtotal.toFixed(2)) {
    throw new Error(`Subtotal does not add up: expected ${subtotal} vs. actual ${rawTotal}`)
}

// Check tax
let taxTotal = appetizersTax;
for (const person of Object.keys(peopleTotals)) {
    taxTotal += peopleTotals[person].tax
}
if (taxTotal.toFixed(2) !== tax.toFixed(2)) {
    throw new Error(`Tax does not add up: expected ${tax} vs. actual ${taxTotal}`)
}

// Check tip
let tipTotal = appetizersTip;
for (const person of Object.keys(peopleTotals)) {
    tipTotal += peopleTotals[person].tip
}
if (tipTotal.toFixed(2) !== tip.toFixed(2)) {
    throw new Error(`Tip does not add up: expected ${tip} vs. actual ${tipTotal}`)
}

// Check total
const totalTotal = rawTotal + taxTotal + tipTotal;
if (totalTotal.toFixed(2) !== total.toFixed(2)) {
    throw new Error(`Total does not add up: expected ${total} vs. actual ${totalTotal}`)
}


console.log(`Total: ${total}`)
console.log(`Tip: ${tip}`)
if (appetizers.length) {
    console.log(`Appetizers (with tax and tip) $${appetizersTotal.toFixed(2)}\n\tSplit ${numberOfPeopleSplittingAppetizers} ways between ${namesOfPeopleSplittingAppetizers.map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(', ')}`);
}
for (const person of Object.keys(peopleTotals)) {
    let personTotal = peopleTotals[person].foodTotal + peopleTotals[person].tax + peopleTotals[person].tip;
    if (namesOfPeopleSplittingAppetizers.find(name => name === person)) {
        personTotal += appetizersTotal / numberOfPeopleSplittingAppetizers;
    }
    console.log(`${person.charAt(0).toUpperCase() + person.slice(1)} owes $${personTotal.toFixed(2)} (${peopleTotals[person].food.join(', ')})`);
}