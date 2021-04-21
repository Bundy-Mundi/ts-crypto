import "../../global_types";

class Block {
    kind: 'Block';
    timestamp:  BlockProp["timestamp"];
    lastHash:   BlockProp["lastHash"];
    hash:       BlockProp["hash"];
    nonce:      BlockProp["nonce"];
    difficulty: BlockProp["difficulty"];
    data:       BlockProp["data"];

    constructor({ timestamp, lastHash, hash, nonce, difficulty, data }:BlockProp){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.data = data;
    }
}

export default Block;