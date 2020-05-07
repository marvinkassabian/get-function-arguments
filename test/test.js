const { expect } = require('chai');
const getFunctionArguments = require('../index');

const test = config => (fn, expected) => {
    it(`should return ${expected}`, () => {
        const args = getFunctionArguments(config)(fn);

        expect(args).to.eql(expected);
    });
};

describe('getFunctionArguments()', () => {
    context('with fat arrows', () => {
        const _test = test();
        _test((x, y) => { }, ['x', 'y']);
        _test(({ x, y }) => { }, [['x', 'y']]);
        _test(
            (x, { y: { y1, y2 }, z }) => { },
            ['x', [{ 'y': ['y1', 'y2'] }, 'z']]);
    });
    context(`with fat arrows and '$' prefix`, () => {
        const _test = test({ prefix: '$' });
        _test(($x, $y) => { }, ['$x', '$y']);
        _test((x, $y) => { }, ['$y']);
        _test((x, y) => { }, []);
    });
});