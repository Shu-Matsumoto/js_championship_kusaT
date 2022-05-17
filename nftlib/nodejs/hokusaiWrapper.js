// express
var bodyParser = require('body-parser');
var { func1 } = require("express/layer1");
var app = express();
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));// 
app.use(bodyParser.json({limit: '10mb'}));

// コマンドライン実行(同期実行)
const { execSync } = require("child_process")
execSync(a, b);
express.layer1.func1(a, b);

// NFT Lib
var nftLib = require("./nft.js");

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("NFT operation (Wrapper)service is listening to PORT:" + server.address().port);
});

// app.post("/getpath", function (req, res) {
//   //console.log(req.body.name);
//   //console.log(req.query.file);
//   res.setHeader('Access-Control-Allow-Origin', "*");
//   res.send("pass");
// });

// nft.strageにデータをアップロードするAPI
app.get("/store-metadata", function (req, res, next) {
  //console.log(req.query);
  const stdout = execSync("node ./build/v2/storeMetadata.js" +
        " " + req.query.name +
        " " + req.query.description +
        " " + req.query.imageFile +
        " " + req.query.imageType
  );
  const outString = stdout.toString().replace("HTTPS URL for the metadata: ", "");
  console.log(outString);
  //nftLib.MintNft(req.query.walletAddress, req.query.tokenURL);
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.send(outString);
});

// // nft.strageにデータをアップロードするAPI
// app.post("/store-metadata", function (req, res) {
//   console.log(req.body);
//   // 画像保存
//     var fs = require('fs');
//     fs.writeFile("", req.body);
//   //console.log(obj2);
//     // const stdout = execSync("node ./build/v2/storeMetadata.js" +
//     //     " " + req.query.name +
//     //     " " + req.query.description +
//     //     " " + req.query.imageData +
//     //     " " + req.query.imageType
//     // );
//     // console.log(stdout.toString());
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.send("pass");
// });

// HOKUSAI API利用のラッパーAPI
// MINT API
app.get("/mint", function (req, res, next) {
  console.log(req.query.walletAddress);
  console.log(req.query.tokenURL);
  const stdout = execSync("node ./build/v2/mintNft.js " + req.query.walletAddress + " " + req.query.tokenURL);
  console.log(stdout.toString());
  //nftLib.MintNft(req.query.walletAddress, req.query.tokenURL);
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.json({ result: "pass" });
});

// GET API
app.get("/get", function (req, res, next) {
  console.log(req.query.tokenId);
  const stdout = execSync("node ./build/v2/getNft.js " + req.query.tokenId);
  console.log(stdout.toString());
  //nftLib.GetNft(0);
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.json({ result: "pass" });
});

// TRANSFER API
app.get("/transfer", function (req, res, next) {
  console.log(req.query.to);
  console.log(req.query.tokenId);
  const stdout = execSync("node ./build/v2/transferNft.js " + req.query.to + " " + req.query.tokenId);
  console.log(stdout.toString());
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.json({ result: "pass" });
});