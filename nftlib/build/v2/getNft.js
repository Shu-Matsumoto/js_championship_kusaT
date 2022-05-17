"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv").config();
const baseUrl = "https://api.hokusai.app";
const getNft = async (baseUrl, network, apiKey, contractVer, contractId, tokenId) => {
    const path = `/v2/${network}/nft/${contractVer}/${contractId}/${tokenId}`;
    const url = new URL(baseUrl + path);
    const params = { key: apiKey };
    url.search = new URLSearchParams(params).toString();
    const res = await node_fetch_1.default(url);
    return res.json();
};
const argv = process.argv.slice(2);
if (argv.length !== 1) {
    console.log("Usage: node getNFT.ts <tokenId>");
    process.exit(1);
}
getNft(baseUrl, process.env.CONTRACT_NETWORK || "", process.env.HOKUSAI_API_KEY || "", process.env.HOKUSAI_CONTRACT_VERSION || "", process.env.HOKUSAI_CONTRACT_ID || "", argv[0]).then((res) => console.log(res));
