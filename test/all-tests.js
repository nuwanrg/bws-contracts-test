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

//Add an address as a minter
async function addMinter() {
  const QUICKNODE_HTTP_ENDPOINT = process.env.QUICKNODE_HTTP_ENDPOINT;
  const contractAbi = fs.readFileSync("abi.json").toString();
  const privateKey = process.env.METAMASK_PRIVATEKEY;
  const NEW_MINTER_ADDRESS = "0x020d13a97de3a1bce11956fb974a2ffe216f72a1";

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

  try {
    // Define the Minter role hash as per the AccessControl in OpenZeppelin
    const MINTER_ROLE = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("MINTER_ROLE")
    );

    const tx = await contract.grantRole(MINTER_ROLE, NEW_MINTER_ADDRESS);
    const receipt = await tx.wait();
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    // List all minters after the new one has been added
    const minterCount = await contract.getRoleMemberCount(MINTER_ROLE);
    console.log(`Number of minters: ${minterCount.toString()}`);
    for (let i = 0; i < minterCount; i++) {
      const minter = await contract.getRoleMember(MINTER_ROLE, i);
      console.log(`Minter ${i + 1}: ${minter}`);
    }
  } catch (e) {
    console.log(e);
  }
}

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

mintToken();
mintMultipleNFTs();
addMinter();
mintWhitelist();
transferNFT();
burnToken();
