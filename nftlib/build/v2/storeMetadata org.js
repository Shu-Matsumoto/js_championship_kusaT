"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const nft_storage_1 = require("nft.storage");
require("dotenv").config();
const endpoint = nft_storage_1.toGatewayURL("https://api.nft.storage");
const token = process.env.NFT_STORAGE_API_KEY || "";
async function main() {
    const storage = new nft_storage_1.NFTStorage({ endpoint, token });
    const metadata = await storage.store({
        name: "nft.storage store test",
        description: "Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
        image: new nft_storage_1.File([await fs_1.default.promises.readFile("hokusai.png")], "hokusai.png", {
            type: "image/png",
        }),
    });
    const url = new URL(metadata.url);
    console.log(`HTTPS URL for the metadata: https://dweb.link/ipfs/${url.hostname}${url.pathname}`);
}
main();
