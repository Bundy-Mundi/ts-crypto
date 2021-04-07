const Blockchain = require("./blockchain");
const Block = require("./block");
const cryptoHash = require('./crypto-hash');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;
    
    beforeEach(() => { //Assures we are getting a fresh blockchain instance for each test.
        blockchain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockchain;
    });

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({ data: newData });
    
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        beforeEach(() => {
            blockchain.addBlock({ data: 'Bears' });
            blockchain.addBlock({ data: 'Pears' });
            blockchain.addBlock({ data: 'Gears' });
        });

        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
        
        describe('when the chain start with the genesis block and ahs multiple blocks', () => {
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'Crashed-Hash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'some-bad-evil-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
            describe('and the chain contain a block with a jumped difficulty', () => {
                it('returns false', () => {
                    const lastBlock = blockchain.chain[blockchain.chain.length - 1];
                    const timestamp = Date.now();
                    const lastHash = lastBlock.hash;
                    const nonce = 0;
                    const data = [];
                    const difficulty = lastBlock.difficulty - 3; // manipulate the difficulty to create a badBlock
                
                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block({ timestamp, lastHash, hash, difficulty, nonce, data })
                
                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
        });

    });

    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });
        
        describe('when the new chain is not longer', () => {
            beforeEach(() => {
                // New chain is shorter
                newChain.chain[0] = { new: 'chain' };

                // Try the function which will not replace the chain
                blockchain.replaceChain(newChain.chain);
            });

            it('does not replace the chain', () => {
                // When the new chain is shorter than the original blockchain, then we expect it to just keep the original one.
                expect(blockchain.chain).toEqual(originalChain.chain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'Bears' });
                newChain.addBlock({ data: 'Pears' });
                newChain.addBlock({ data: 'Gears' });
                newChain.addBlock({ data: 'Mears' });
            });
            describe('when the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-fake-hash';
                    blockchain.replaceChain(newChain.chain);
                });
                it('does not replace the chain', () => {
                    // We expect the chain to be original
                    expect(blockchain.chain).toEqual(originalChain.chain);
                });
                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });
            describe('when the chain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                });
                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                });
                it('logs about the chain replacement', () => {
                    expect(logMock).toHaveBeenCalled();
                });
            });
        });
    });
})