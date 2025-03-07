// DAO-style Voting System with Smart Contract and MetaMask Integration
// Node.js backend integrated with Solidity smart contract and MetaMask for decentralized voting

const express = require('express');
const path = require('path');
const fs = require('fs');
const { ethers } = require('ethers');
const contractABI = require('../contracts/daoVoting.json'); // ABI of the deployed smart contract
const Blockchain = require('../blockchain/blockchain');
const Transaction = require('../blockchain/transaction');
const Data = require('../data/blockchain');

// Initialize Express App
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ethereum Provider and Contract Setup
const provider = new ethers.JsonRpcProvider('https://bsc-testnet-dataseed.bnbchain.org');
const contractAddress = '0x1E0ed709A2d856FcE8dc46dC5FEf4a548f8878FE';
const privateKey = '0x18796c8f1bf1333e506e4a94bba5014bf35bb9e9edc2551c9c4d9bdc81703c21'; // have to move to env
const wallet = new ethers.Wallet(privateKey, provider);

const daoVotingContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Initialize Proof-of-Work Blockchain
const daoChain = new Blockchain();

// API Endpoints
// Create Proposal
app.post('/proposals', async (req, res) => {
    try {
        const { description, votingType, endTime, account } = req.body;

        // Check if account is connected
        if (!account) {
            return res.status(400).json({ message: 'MetaMask account not connected' });
        }
        // Smart contract interaction
        const tx = await daoVotingContract.createProposal(description, votingType, endTime);
        await tx.wait();

        // Create PoW Transaction
        const proposalTransaction = new Transaction('proposal', { description, votingType, endTime }, account);
        if (!proposalTransaction.isValid()) {
            return res.status(400).json({ message: 'Invalid proposal transaction' });
        }
        daoChain.addTransaction(proposalTransaction);
        res.status(201).json({ message: 'Proposal created and added to blockchain!' });
    } catch (error) {
        console.error('Transaction Error:', error.message);
    if (error.reason) console.error('Revert Reason:', error.reason);
        res.status(500).json({ message: 'Error creating proposal', error: error.message });
    }
});

// Vote on Proposal
app.post('/vote', async (req, res) => {
    try {
        const { proposalId, votes, account } = req.body;
        console.log(account, "", proposalId, "", votes);

        // Check if account is connected
        if (!account) {
            return res.status(400).json({ message: 'MetaMask account not connected' });
        }        
        
        // Connect the account with the smart contract
        const tx = await daoVotingContract.vote(proposalId, votes);
        await tx.wait();        

        // Create PoW Transaction
        const voteTransaction = new Transaction('vote', { proposalId, votes }, account);
        if (!voteTransaction.isValid()) {
            return res.status(400).json({ message: 'Invalid vote transaction' });
        }
        daoChain.addTransaction(voteTransaction);
        res.status(201).json({ message: 'Vote cast and recorded on blockchain!' });
    } catch (error) {
        console.error('Transaction Error:', error.message);
    if (error.reason) console.error('Revert Reason:', error.reason);
        res.status(500).json({ message: 'Error casting vote', error: error.message });
    }
});

// Execute Proposal
app.post('/execute', async (req, res) => {
    try {
        const { proposalId, account } = req.body;
        console.log(`Executing proposal ID: ${proposalId} by account: ${account}`);

        // Check if account is connected
        if (!account) {
            return res.status(400).json({ message: 'MetaMask account not connected' });
        }

        // Execute the proposal
        const tx = await daoVotingContract.executeProposal(proposalId);
        await tx.wait();

        res.status(201).json({ message: 'Proposal executed successfully!' });
    } catch (error) {
        console.error('Transaction Error:', error.message);
        if (error.reason) console.error('Revert Reason:', error.reason);
        res.status(500).json({ message: 'Error executing proposal', error: error.message });
    }
});

// Get Proposal Results
app.get('/results/:proposalId', async (req, res) => {
    try {
        const proposalId = req.params.proposalId;
        console.log("proposalid", proposalId);
        
        const totalVotes = await daoVotingContract.getProposalVotes(proposalId);
        const totalVotesInt = parseInt(totalVotes.toString());
        console.log("total votes", parseInt(totalVotes), totalVotesInt);

        res.json({ proposalId, totalVotes:totalVotesInt });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results', error: error.message });
    }
});

// Get lockchain Data
app.get('/ledger', (req, res) => {
    console.log("here");
    
    console.log('Blockchain Ledger:', JSON.stringify(daoChain.chain, null, 2));
    console.log('Blockchain Ledger:', JSON.stringify(Data, null, 2));
    res.json(Data);
});


// Serve UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




