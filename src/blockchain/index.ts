import Block from "../block";
import { genesis, mineBlock, adjustDifficulty } from "../block/block.functions";
import cryptoHash from "../utils/crypto-hash";
import { isValidChain } from "./blockchain.functions";

class BlockChain{
    kind: 'Blockchain';
    chain: Block[];
    constructor(){
        this.chain = [genesis()];
    }

    addBlock({ data }): void {
        const newBlock = mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push(newBlock);
    }

    replaceChain(chain: BlockChain["chain"]): void {
        if(chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return;
        }

        if(!isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }

        console.log("Replacing chain with, ", chain);
        this.chain = chain;
    }
}

export default BlockChain;