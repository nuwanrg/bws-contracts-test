require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

//Transfer a NFT from one wallet to another
async function transferNFT() {
  const QUICKNODE_HTTP_ENDPOINT = process.env.QUICKNODE_HTTP_ENDPOINT;
  const contractAbi = fs.readFileSync("abi.json").toString();
  const privateKey = process.env.METAMASK_PRIVATEKEY;

  console.log(QUICKNODE_HTTP_ENDPOINT);
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

  const fromAddress = "0x16a1842b8ca64EaD5ff24F21aFd54EAe04974eF5";
  const toAddress = "0x0B3d07B26D2e5E1d0c2696d0E13d26BFD7344579";
  const tokenId = 1; // replace with your token ID
  try {
    const tx = await contract.transferFrom(fromAddress, toAddress, tokenId);
    console.log("Transaction Hash:", tx.hash);
    const receipt = await tx.wait(); // waiting for transaction to be mined
    console.log("Transaction Receipt:", receipt);
  } catch (e) {
    console.log(e);
  }
}

transferNFT();
