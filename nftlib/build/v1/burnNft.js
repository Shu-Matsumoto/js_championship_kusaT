"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const MetaTx_1 = require("./lib/MetaTx");
require("dotenv").config();
const baseUrl = "https://mumbai.hokusai.app";
const RPC = "https://rpc-mumbai.maticvigil.com";
async function transferNft(baseUrl, apiKey, contractId, messageWithSignature) {
    const path = `/v1/nfts/${contractId}/transfer`;
    const url = new URL(`${baseUrl}${path}`);
    const params = { key: apiKey };
    const requestBody = { request: messageWithSignature };
    url.search = new URLSearchParams(params).toString();
    const res = await node_fetch_1.default(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
    if (res.status != 200) {
        console.log(res);
        throw new Error(await res.text());
    }
    return res.json();
}
async function main() {
    const argv = process.argv.slice(2);
    if (argv.length !== 1) {
        console.log("Usage: node burnNft.ts <tokenId>");
        process.exit(1);
    }
    const walletPrivateKey = process.env.WALLET_PRIVATE_KEY || "";
    const apiKey = process.env.HOKUSAI_API_KEY || "";
    const contractId = process.env.HOKUSAI_CONTRACT_ID || "";
    const contractAddress = process.env.HOKUSAI_CONTRACT_ADDRESS || "";
    const forwarderAddress = "0x0E285b682EAF6244a2AD3b1D25cFe61BF6A41fc3";
    const tokenId = Number(argv[0]) || 0;
    try {
        const messageWithSignature = await MetaTx_1.getBurnMessageWithSignature(RPC, walletPrivateKey, contractAddress, forwarderAddress, tokenId);
        const res = await transferNft(baseUrl, apiKey, contractId, messageWithSignature);
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}
main();
