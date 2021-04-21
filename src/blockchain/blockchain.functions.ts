import { genesis } from "../block/block.functions";
import Blockchain from "./index";
import cryptoHash from "../utils/crypto-hash";

const isValidChain = (chain: Blockchain["chain"]) : boolean => {
    if(JSON.stringify(chain[0]) !== JSON.stringify(genesis())){
        return false;
    };

    for (let i=1; i<chain.length; i++) {
        const { timestamp, lastHash, hash, nonce, difficulty, data } = chain[i];
        
        const actualLastHash = chain[i-1].hash;
        
        const lastDifficulty = chain[i-1].difficulty;

        if(lastHash !== actualLastHash) return false;
    
        const validatedHash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);
    
        // If the re-generated hash does not match to the each chain[i]'s hash return false
        if (hash !== validatedHash) return false; 

        // If the difficulty jumps, return false
        if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
}

export { isValidChain };