require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

//Mint a NFT from a whitelisted address
async function mintWhitelist() {
  const QUICKNODE_HTTP_ENDPOINT = process.env.QUICKNODE_HTTP_ENDPOINT;
  const contractAbi = fs.readFileSync("abi.json").toString();
  const privateKey =
    "875397cb8c9bb5e2f030fba46cacfd4eb2659def0460ce93a9ef9c068cd93c92";

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
  let contractInstance = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  let to = "0x020D13a97dE3a1BcE11956fb974A2fFE216f72A1";
  let tokenId = 4; // Change this to the ID you want to mint
  let uri = "https://api.example.com/token/1"; // Change this to your token's URI
  try {
    let tx = await contractInstance.safeMint(to, tokenId, uri);
    console.log(tx);
  } catch (e) {
    console.log(e);
  }
}

mintWhitelist();
