const cryptoHash = require("./crypto-hash");

describe('cryptoHash()', () => {
    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('benebenben'))
            .toEqual('71c0f7ce2a0e5f8ceba77ab5de3763cb209ded4bd3f13a43ff3afb15c016f49a')
    });

    it('produces the same hash with the same input arguments in any order', () => {
        expect(cryptoHash('one', 'two', 'three'))
            .toEqual(cryptoHash('three', 'one', 'two'));
    })
})