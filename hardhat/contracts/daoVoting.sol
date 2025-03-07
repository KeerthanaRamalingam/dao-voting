// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract DaoVoting {
    enum VotingType { SingleChoice, Weighted, Quadratic, Approval }
    
    struct Proposal {
        uint256 id;
        string description;
        VotingType votingType;
        uint256 endTime;
        address creator;
        bool executed;
        mapping(address => bool) voters;
        mapping(uint256 => uint256) votes;
        uint256 totalVotes;
    }
    
    IERC20 public votingToken;
    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    
    event ProposalCreated(uint256 proposalId, string description, VotingType votingType, uint256 endTime);
    event VoteCast(uint256 proposalId, address voter, uint256 votes);
    event ProposalExecuted(uint256 proposalId);
    
    constructor(address _votingToken) {
        votingToken = IERC20(_votingToken);
    }
    
    function createProposal(string memory description, VotingType votingType, uint256 endTime) external {
        require(endTime > block.timestamp, "End time must be in the future");
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.description = description;
        proposal.votingType = votingType;.
        proposal.endTime = endTime;
        proposal.creator = msg.sender;
        emit ProposalCreated(proposalCount, description, votingType, endTime);
        proposalCount++;
    }
    
    function vote(uint256 proposalId, uint256 votes) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.endTime, "Voting has ended");
        require(!proposal.voters[msg.sender], "Already voted");
        uint256 votingPower = votingToken.balanceOf(msg.sender);
        require(votingPower >= votes, "Insufficient voting power");
        
        if (proposal.votingType == VotingType.Quadratic) {
            uint256 cost = votes * votes;
            require(votingPower >= cost, "Insufficient tokens for quadratic voting");
            proposal.votes[proposalId] += cost;
        } else if (proposal.votingType == VotingType.Weighted) {
            proposal.votes[proposalId] += votes * votingPower;
        } else if (proposal.votingType == VotingType.Approval) {
            proposal.votes[proposalId] += 1;
        } else {
            proposal.votes[proposalId] += 1;
        }
        proposal.voters[msg.sender] = true;
        proposal.totalVotes += votes;
        emit VoteCast(proposalId, msg.sender, votes);
    }
    
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.endTime, "Voting is not finished yet");
        require(!proposal.executed, "Proposal already executed");
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
    
    function getProposalVotes(uint256 proposalId) external view returns (uint256) {
        return proposals[proposalId].totalVotes;
    }
}
