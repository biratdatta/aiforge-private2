import { ethers } from "ethers";



 export async function getContract() {

    const provider = new ethers.JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com'); // For ethers 6
    const signer = new ethers.Wallet('30d4686446d1cd0e955e973c3ded90d17a2242ea692f304e52239862cb70c1e1', provider);
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "datasetId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "newFileSize",
				"type": "uint256"
			}
		],
		"name": "contributeToDataset",
		"outputs": [],
		"stateMutability": "nonpayable",
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
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "size",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
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
			},
			{
				"internalType": "uint256",
				"name": "size",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
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
				"name": "size",
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
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
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


export async function stakeToVerify() {
    const contract = await getContract();
    if (!contract) return;

    const stakeAmount = ethers.parseEther("0.00001"); // Amount to stake
    try {
        const tx = await contract.stakeToVerify({ value: stakeAmount });
        await tx.wait();
        alert(`Stake transaction successful: ${tx.hash}`);
    } catch (error) {
        console.error("Error staking to verify:", error);
        alert("Transaction failed. Check console for details.");
    }
}


  

 export async function uploadDataset(price, size, tokenURI) {
    const contract = await getContract();
    if (!contract) return;

    try {
        const tx = await contract.uploadDataset(
            ethers.parseEther(price.toString()), // Convert ETH to Wei
            size, // Dataset size
            tokenURI // TokenURI
        );
        await tx.wait();
        alert(`Dataset uploaded successfully: ${tx.hash}`);
    } catch (error) {
        console.error("Error uploading dataset:", error);
        alert("Transaction failed. Check console for details.");
    }
}





 export async function purchaseDataset(datasetId, priceInEther) {
    const contract = await getContract();
    if (!contract) return;

    const priceInWei = ethers.parseEther(priceInEther); // Convert Ether to Wei
    try {
        // Call the payable function with the dataset ID and value
        const tx = await contract.purchaseDataset(datasetId, { value: priceInWei });
        await tx.wait();
        alert(`Dataset purchased successfully: ${tx.hash}`);
    } catch (error) {
        console.error("Error purchasing dataset:", error);
        alert("Transaction failed. Check console for details.");
    }
}


export async function voteDataset(datasetId, rating) {
    const contract = await getContract();
    if (!contract) return;

    try {
        // Call the function with dataset ID and rating
        const tx = await contract.voteDataset(datasetId, rating);
        await tx.wait();
        alert(`Vote submitted successfully: ${tx.hash}`);
    } catch (error) {
        console.error("Error voting on dataset:", error);
        alert("Transaction failed. Check console for details.");
    }
}
