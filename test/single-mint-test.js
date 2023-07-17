require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

//Mint a taken from contract owner address
async function mintToken() {
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

  let to = "0x16a1842b8ca64EaD5ff24F21aFd54EAe04974eF5";
  let tokenId = 3; // Change this to the ID you want to mint
  let uri = "https://api.example.com/token/3"; // Change this to your token's URI
  try {
    let tx = await contract.safeMint(to, tokenId, uri);
    console.log(tx);
  } catch (e) {
    console.log(e);
  }
}

mintToken();
