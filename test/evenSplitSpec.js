const mealSplitter = require('../lib/mealSplitter.js');

describe('even split', () => {
    it('nominal only app everyone splits', () => {
        const result = mealSplitter({
            appetizers: [1],
            meals: [
            {
                name: "kevin",
                food: []
            },
            {
                name: "sammi",
                food: []
            },
            {
                name: "kyle",
                food: []
            }
        ],
            subtotal: 1,
            tax: 2,
            tip: 3,
            total: 6 // subtotal + tax + tip
        });
        expect(result.subtotal).withContext('subtotal').toEqual(1);
        expect(result.tax).withContext('tax').toEqual(2);
        expect(result.tip).withContext('tip').toEqual(3);
        expect(result.total).withContext('total').toEqual('6.00');
        expect(result.appetizersTotal).withContext('appetizersTotal').toEqual('6.00');
        expect(result.peopleTotals).withContext('peopleTotals').toEqual({
            'kevin': {
                foodTotal: 0,
                food: [],
                tax: 0,
                tip: 0
            },
            'sammi': {
                foodTotal: 0,
                food: [],
                tax: 0,
                tip: 0
            },
            'kyle': {
                foodTotal: 0,
                food: [],
                tax: 0,
                tip: 0
            }
        });
    });
});