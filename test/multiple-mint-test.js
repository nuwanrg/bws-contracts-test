require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

//Mint multiple tokens at once from contract owner address
async function mintMultipleNFTs() {
  const QUICKNODE_HTTP_ENDPOINT = process.env.QUICKNODE_HTTP_ENDPOINT;
  const contractAbi = fs.readFileSync("abi.json").toString();
  const privateKey = process.env.METAMASK_PRIVATEKEY;

  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(
    QUICKNODE_HTTP_ENDPOINT
  );

  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

  // Create a signer
  let wallet = new ethers.Wallet(privateKey);
  let signer = wallet.connect(provider);

  // Create a contract instance
  let contract = new ethers.Contract(contractAddress, contractAbi, signer);

  const toAddresses = [
    "0x0B3d07B26D2e5E1d0c2696d0E13d26BFD7344579",
    "0x020D13a97dE3a1BcE11956fb974A2fFE216f72A1",
  ];
  const tokenIds = [5, 6]; // token ids
  const uris = [
    "https://api.example.com/token/5",
    "https://api.example.com/token/6",
  ];
  try {
    const tx = await contract.mintMultiple(toAddresses, tokenIds, uris);
    console.log("Transaction Hash:", tx.hash);
    const receipt = await tx.wait(); // waiting for transaction to be mined
    console.log("Transaction Receipt:", receipt);
  } catch (e) {
    console.log(e);
  }
}

mintMultipleNFTs();
