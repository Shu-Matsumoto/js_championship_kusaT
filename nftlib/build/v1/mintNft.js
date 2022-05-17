"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv").config();
const baseUrl = "https://mumbai.hokusai.app";
const mintNft = async (baseUrl, apiKey, contractId, to, tokenUri) => {
    const path = `/v1/nfts/${contractId}/mint`;
    const url = new URL(baseUrl + path);
    const params = { key: apiKey };
    const requestBody = { to, tokenUri };
    url.search = new URLSearchParams(params).toString();
    const res = await node_fetch_1.default(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });
    if (res.status != 200) {
        console.log(res.status);
        throw new Error(await res.text());
    }
    return res.json();
};
const argv = process.argv.slice(2);
if (argv.length !== 2) {
    console.log("Usage: node mintNft.ts <to> <tokenUri>");
    process.exit(1);
}
console.log(`baseUrl: ${baseUrl}`);
mintNft(baseUrl, process.env.HOKUSAI_API_KEY || "", process.env.HOKUSAI_CONTRACT_ID || "", argv[0], argv[1])
    .then((res) => {
    console.log(res);
})
    .catch((err) => {
    console.log(err);
});
