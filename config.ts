type Block = {
    timestamp: number,
    lastHash: string,
    hash: string,
    nonce: number,
    difficulty: number,
    data: any
}

const MINE_RATE:number = 1000;
const INITIAL_DIFFICULTY:number = 3;
const INITIAL_NONCE:number = 0;

const GENESIS_DATA:Block = {
    timestamp: 1,
    lastHash: '----',
    hash: 'hash-one',
    nonce: INITIAL_NONCE,
    difficulty: INITIAL_DIFFICULTY,
    data: []
};

module.exports = { GENESIS_DATA, MINE_RATE };