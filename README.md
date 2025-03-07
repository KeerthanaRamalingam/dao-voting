# 🗳️ DAO Voting System

A **Decentralized Autonomous Organization (DAO)** style voting system that integrates a **Solidity smart contract**, **Proof-of-Work (PoW) blockchain**, and **MetaMask** for decentralized governance. The system supports **multiple voting types**, **token-based voting power**, and **immutability** through a custom PoW blockchain.

---

## 🚀 **Features**
- 🗳️ **Multiple Voting Types:** Single Choice, Weighted, Quadratic, Approval Voting
- 🔐 **Token-Based Voting Power:** Voting power based on ERC20 token holdings
- ⛓️ **Immutable Blockchain:** Custom PoW blockchain to store votes and proposals
- 🔗 **Smart Contract Integration:** Uses Ethereum smart contracts for governance
- 🦊 **MetaMask Integration:** Sign and execute transactions directly from the browser
- 📊 **RESTful APIs:** Create proposals, cast votes, view results, and explore the ledger

---

## 📂 **Project Structure**
```
dao-voting-system/
├── blockchain/           # PoW blockchain implementation
│   ├── block.js          # Block structure
│   ├── blockchain.js     # Blockchain class with PoW
│   └── transaction.js    # Transaction validation
├── contracts/            # Solidity smart contract
│   ├── DaoVoting.sol
│   └── daoVoting.json # Compiled ABI
├── data/                 # Persistent data storage
│   └── blockchain.json
├── server/               # Backend server files
│   ├── index.js 
├── public/               # Frontend files
│   ├── index.html         # Express server with APIs
├── Dockerfile            # Optional: Containerization
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

---

## 🛠️ **Installation & Setup**

1. **Clone the Repository:**
```bash
git clone https://github.com/KeerthanaRamalingam/dao-voting.git
cd dao-voting-system
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Compile Smart Contracts:**
```bash
npx hardhat compile
```

4. **Run Local Blockchain:**
```bash
npx hardhat node
```

5. **Deploy Smart Contract:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

6. **Start Express Server:**
```bash
node index.js
Make sure to alter the contract address
```

7. **Open in Browser:**
```http
http://localhost:3000
```

8. **Connect MetaMask:**
- Ensure MetaMask is connected to **localhost:8545**.

---

## **How to Use**
1. **Create a Proposal:** Fill in **description**, **voting type**, and **end time**.
2. **Vote on a Proposal:** Choose a proposal and cast your vote using **token-based power**.
3. **View Results:** Check the voting outcome and the **blockchain ledger**.

---

## 🔥 **API Endpoints**
### 1. **Create Proposal**
```http
POST /proposals
```

### 2. **Cast Vote**
```http
POST /vote
```

### 3. **Get Voting Results**
```http
GET /results/:proposalId
```

### 4. **Get Blockchain Data**
```http
GET /ledger
```

## 📈 **Future Improvements**
- ✅ Token based voting power
- ✅ Add metamask popup for confirmations
- ✅ Requires Code scalability and security checks
- ✅ Add **Docker support** for containerized deployment
- 💡 Implement **frontend visualizations** for the **blockchain ledger**
---



