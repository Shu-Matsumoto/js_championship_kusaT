var axios = require("axios").default;
// APP Data import
var appDataDef = require("./appDataDef.js");

// Private method:NFTのMINT操作
const _mintNft = async (baseUrl, network, apiKey, contractVer, contractId, to, tokenURI) => {
  const path = `/v2/${network}/nft/${contractVer}/${contractId}/mint`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  url.search = new URLSearchParams(params).toString();
  const requestBody = [{ to, tokenURI }];  
  const response = await axios.post(url.toString(), requestBody, { headers: { 'Content-Type': 'application/json' } });
  console.log(response);
  if (response.status != 200) {
    console.log(response.status);
    throw new Error(response.text());
  }
  return response.data;
};

// Private method:NFTのGet操作
const _getNft = async (baseUrl, network, apiKey, contractVer, contractId, tokenId) => {
  const path = `/v2/${network}/nft/${contractVer}/${contractId}/${tokenId}`;
  const url = new URL(baseUrl + path);
  const params = { key: apiKey };
  url.search = new URLSearchParams(params).toString();
  const response = await axios.get(url.toString());
  //console.log(response);
  if (response.status != 200) {
    console.log(response.status);
    throw new Error(response.text());
  }
  return response.data;
};

// MINT
exports.MintNft = function(walletAddress, tokenURL) {
  console.log("nft mint");
  _mintNft(appDataDef.HOKUSAI_API_URL,
  appDataDef.CONTRACT_NETWORK || "",
  appDataDef.HOKUSAI_API_KEY || "",
  appDataDef.HOKUSAI_CONTRACT_VERSION || "",
  appDataDef.HOKUSAI_CONTRACT_ID || "",
  walletAddress,
  tokenURL).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}

// GET
exports.GetNft = function (tokenId) {
  console.log("nft get:arg=" + tokenId);
  _getNft(appDataDef.HOKUSAI_API_URL,
  appDataDef.CONTRACT_NETWORK || "",
  appDataDef.HOKUSAI_API_KEY || "",
  appDataDef.HOKUSAI_CONTRACT_VERSION || "",
  appDataDef.HOKUSAI_CONTRACT_ID || "",
  tokenId).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}

