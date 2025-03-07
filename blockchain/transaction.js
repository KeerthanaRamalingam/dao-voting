// transaction.js - Defines the structure and validation of transactions

class Transaction {
    constructor(type, data, sender) {
        this.type = type; // 'proposal' or 'vote'
        this.data = data; // Details of the transaction
        this.sender = sender; // Address of the user (e.g., MetaMask account)
        this.timestamp = Date.now(); // Time of transaction creation
    }

    // Validate transaction data
    isValid() {
        if (!this.type || !this.data || !this.sender) return false;
        
        if (this.type === 'proposal') {
            const { description, votingType, endTime } = this.data;
            if (!description || !votingType || !endTime) return false;
            // if (endTime < this.timestamp) return false; // Proposal end time must be in the future
            console.log(this.timestamp);
        }

        if (this.type === 'vote') {
            const { proposalId, votes } = this.data;
            if (!proposalId || votes < 1) return false; // Valid proposal ID and vote count required
        }

        return true;
    }
}

// // Creating a new proposal transaction
// const proposalTx = new Transaction('proposal', {
//     description: 'Add a new feature',
//     votingType: 'single-choice',
//     endTime: Date.now() + 86400000 // 24 hours from now
// }, '0xUserAddress');

// // Creating a new vote transaction
// const voteTx = new Transaction('vote', {
//     proposalId: '123',
//     votes: 5
// }, '0xUserAddress');

// console.log(proposalTx.isValid()); // true
// console.log(voteTx.isValid());     // true

module.exports = Transaction;
