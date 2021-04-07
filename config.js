const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;
const INITIAL_NONCE = 0;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '----',
    hash: 'hash-one',
    nonce: INITIAL_NONCE,
    difficulty: INITIAL_DIFFICULTY,
    data: []
};

module.exports = { GENESIS_DATA, MINE_RATE };