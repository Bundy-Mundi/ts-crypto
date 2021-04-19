const MINE_RATE:number = 1000;
const INITIAL_DIFFICULTY:number = 3;
const INITIAL_NONCE:number = 0;

const GENESIS_DATA:BlockProp = {
    timestamp: 1,
    lastHash: '----',
    hash: 'hash-one',
    nonce: INITIAL_NONCE,
    difficulty: INITIAL_DIFFICULTY,
    data: []
};

export { GENESIS_DATA, MINE_RATE };