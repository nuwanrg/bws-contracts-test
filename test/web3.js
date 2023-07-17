require("dotenv").config();
const fs = require("fs");
const { ethers, Signer } = require("ethers");

let privateKey = null;
let wallet = null;
let provider = null;
let contractInstance = null;
const contractAddress = process.env.QUAD_NFT_CONTRACT_ADDRESS;
const tokenContractAddress = process.env.QUAD_TOKEN_CONTRACT_ADDRESS;
const contractAbi = fs.readFileSync("abi.json").toString();
const QUICKNODE_HTTP_ENDPOINT = process.env.QUICKNODE_HTTP_ENDPOINT;

/**
 * Init the program with required web3 configuration
 */
async function init() {
  try {
    privateKey = process.env.METAMASK_PRIVATEKEY;

    //Create provider
    provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_ENDPOINT);

    //create wallet
    wallet = new ethers.Wallet(privateKey, provider);

    //Create NFT Contract
    contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );
  } catch (error) {
    console.log("Error " + error);
  }
  isInitialized = true;
}
