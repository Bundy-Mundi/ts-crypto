import Block from "./index";
import { GENESIS_DATA, MINE_RATE } from "../../config";
import hexToBinary from "hex-to-binary";
import cryptoHash from "../utils/crypto-hash";

type mineBlockProp = {
    lastBlock: Block;
    data: any;
}
type adjustDifficultyProp = {
    originalBlock: Block;
    timestamp: number;
}
const genesis = (): Block => {
    return new Block(GENESIS_DATA);
}
const mineBlock = ({ lastBlock, data }: mineBlockProp): Block => {
    let hash, timestamp;
    let { hash: lastHash } = lastBlock; // Grabbing previous block's hash
    let { difficulty } = lastBlock;// Grabbing previous block's difficulty
    let nonce = 0;

    do {
        nonce++;
        timestamp = Date.now();
        difficulty = adjustDifficulty({ originalBlock: lastBlock, timestamp });
        hash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);
    } while(hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new Block({
        timestamp,
        lastHash,
        nonce,
        difficulty,
        data,
        hash
    });
}
const adjustDifficulty = ({ originalBlock, timestamp }: adjustDifficultyProp) =>{
    const { difficulty } = originalBlock;

    // prevents difficulty lower than 1;
    if(difficulty < 1) return 1;

    if( (timestamp - originalBlock.timestamp) > MINE_RATE) 
        return difficulty - 1;
    return difficulty + 1;
}

export { genesis, mineBlock, adjustDifficulty };