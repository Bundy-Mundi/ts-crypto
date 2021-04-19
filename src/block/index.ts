import hexToBinary from "hex-to-binary";

class Block {
    timestamp: number;
    lastHash: string;
    hash: string;
    nonce: number;
    difficulty: number;
    data: any;

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