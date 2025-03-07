const Block = require('./block');
const fs = require('fs');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, Date.now().toString(), 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.saveBlockchain();
    }

    saveBlockchain() {
        fs.writeFileSync('data/blockchain.json', JSON.stringify(this.chain, null, 4));
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }

    addTransaction(transaction) {
        if (!transaction.isValid()) {
            console.error('Invalid transaction:', transaction);
            return false;
        }

        const newBlock = new Block(
            this.chain.length, 
            Date.now().toString(), 
            transaction, 
            this.getLatestBlock().hash
        );

        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.saveBlockchain();
        return true;
    }
}

module.exports = Blockchain;
