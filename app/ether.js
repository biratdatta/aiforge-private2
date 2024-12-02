require('dotenv').config();
import { ethers } from "ethers";

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

// Contract details
const CONTRACT_ADDRESS = "0x24709c0afa7f26015dbab970f8fa9f80a266eb68"; // Replace with your deployed contract address
const ABI =      
   [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			}
		],
		"name": "contributeToDataset",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "DatasetPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "uploader",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "DatasetUploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "averageRating",
				"type": "uint256"
			}
		],
		"name": "DatasetVerified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			}
		],
		"name": "purchaseDataset",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stakeToVerify",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "uploadDataset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "verifier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "VerifierStaked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "verifier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			}
		],
		"name": "VerifierVoted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			}
		],
		"name": "voteDataset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "datasetCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "datasets",
		"outputs": [
			{
				"internalType": "address",
				"name": "uploader",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalContributions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cumulativeRating",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINIMUM_STAKE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINIMUM_VOTES",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "verifiers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isVerifier",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
;

async function main() {
    // Initialize provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log(`Using wallet address: ${wallet.address}`);

    // Initialize contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    // Example: Stake to verify
    const stakeAmount = ethers.utils.parseEther("1.0"); // 1 ETH
    console.log("Staking 1 ETH to become a verifier...");
    const stakeTx = await contract.stakeToVerify({ value: stakeAmount });
    await stakeTx.wait();
    console.log(`Stake transaction successful: ${stakeTx.hash}`);

    // Example: Upload a dataset
    const datasetPrice = ethers.utils.parseEther("0.5"); // 0.5 ETH
    console.log("Uploading a dataset...");
    const uploadTx = await contract.uploadDataset(datasetPrice);
    await uploadTx.wait();
    console.log(`Dataset uploaded successfully: ${uploadTx.hash}`);

    // Example: Contribute to a dataset
    const datasetId = 0; // Replace with an existing dataset ID
    const contributionAmount = ethers.utils.parseEther("0.1"); // 0.1 ETH
    console.log(`Contributing 0.1 ETH to dataset ${datasetId}...`);
    const contributeTx = await contract.contributeToDataset(datasetId, { value: contributionAmount });
    await contributeTx.wait();
    console.log(`Contribution successful: ${contributeTx.hash}`);

    // Example: Purchase a dataset
    console.log(`Purchasing dataset ${datasetId} for ${datasetPrice}...`);
    const purchaseTx = await contract.purchaseDataset(datasetId, { value: datasetPrice });
    await purchaseTx.wait();
    console.log(`Dataset purchased successfully: ${purchaseTx.hash}`);
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
