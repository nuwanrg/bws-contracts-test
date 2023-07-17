require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

//Burn a NFT
async function burnToken() {
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

  let tokenId = 3; // Change this to the ID you want to mint
  try {
    let tx = await contract.burn(tokenId);
    console.log(`Burning token ${tokenId}...`);
    let receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);
    console.log(`Token ${tokenId} has been burned`);
  } catch (e) {
    console.log(e);
  }
}

burnToken();
