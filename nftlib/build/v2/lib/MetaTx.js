"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBurnMessageWithSignature = exports.getTransferMessageWithSignature = void 0;
const ethers_1 = require("ethers");
const TypedData_1 = require("./TypedData");
const MinimalForwarder_json_1 = __importDefault(require("./abis/MinimalForwarder.json"));
const ERC721WithRoyaltyMetaTx_json_1 = __importDefault(require("./abis/ERC721WithRoyaltyMetaTx.json"));
const ERC721HWithRoyaltyMetaTx_json_1 = __importDefault(require("./abis/ERC721HWithRoyaltyMetaTx.json"));
async function getTransferMessageWithSignature(rpc, walletPrivateKey, contractVer, contractAddress, forwarderAddress, toAddress, tokenId) {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpc);
    const signer = new ethers_1.ethers.Wallet(walletPrivateKey);
    const { chainId } = await provider.getNetwork();
    const address = await signer.getAddress();
    // Setup contracts
    const forwarder = new ethers_1.ethers.Contract(forwarderAddress, MinimalForwarder_json_1.default.abi, provider);
    // Switch contract interface by contract version
    let hokusaiInterface;
    if (contractVer === 1) {
        hokusaiInterface = new ethers_1.ethers.utils.Interface(ERC721WithRoyaltyMetaTx_json_1.default.abi);
    }
    else if (contractVer === 2) {
        hokusaiInterface = new ethers_1.ethers.utils.Interface(ERC721HWithRoyaltyMetaTx_json_1.default.abi);
    }
    else {
        throw new Error(`Invalid contract version: ${contractVer}`);
    }
    // Create tranferFrom data
    const data = hokusaiInterface.encodeFunctionData("transferFrom", [
        address,
        toAddress,
        tokenId,
    ]);
    // Create meta transaction message
    const message = {
        from: address,
        to: contractAddress,
        value: 0,
        gas: 1e6,
        nonce: (await forwarder.getNonce(address)).toNumber(),
        data,
    };
    // Create typedDataV4
    const typedData = TypedData_1.createTypedDataV4(chainId, forwarderAddress, message);
    // Sign message
    const signature = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);
    const messageWithSignature = { ...message, signature };
    return messageWithSignature;
}
exports.getTransferMessageWithSignature = getTransferMessageWithSignature;
async function getBurnMessageWithSignature(rpc, walletPrivateKey, contractVer, contractAddress, forwarderAddress, tokenId) {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpc);
    const signer = new ethers_1.ethers.Wallet(walletPrivateKey);
    const { chainId } = await provider.getNetwork();
    const address = await signer.getAddress();
    // Setup contracts
    const forwarder = new ethers_1.ethers.Contract(forwarderAddress, MinimalForwarder_json_1.default.abi, provider);
    // Switch contract interface by contract version
    let hokusaiInterface;
    if (contractVer === 1) {
        hokusaiInterface = new ethers_1.ethers.utils.Interface(ERC721WithRoyaltyMetaTx_json_1.default.abi);
    }
    else if (contractVer === 2) {
        hokusaiInterface = new ethers_1.ethers.utils.Interface(ERC721HWithRoyaltyMetaTx_json_1.default.abi);
    }
    else {
        throw new Error(`Invalid contract version: ${contractVer}`);
    }
    // Create burn data
    const data = hokusaiInterface.encodeFunctionData("burn", [
        tokenId,
    ]);
    // Create meta transaction message
    const message = {
        from: address,
        to: contractAddress,
        value: 0,
        gas: 1e6,
        nonce: (await forwarder.getNonce(address)).toNumber(),
        data,
    };
    // Create typedDataV4
    const typedData = TypedData_1.createTypedDataV4(chainId, forwarderAddress, message);
    // Sign message
    const signature = await signer._signTypedData(typedData.domain, typedData.types, typedData.message);
    const messageWithSignature = { ...message, signature };
    return messageWithSignature;
}
exports.getBurnMessageWithSignature = getBurnMessageWithSignature;
