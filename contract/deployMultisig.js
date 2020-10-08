const fs = require("fs");
const solc = require('solc')
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var input = {
    'MultiSigWalletWithDailyLimit.sol': fs.readFileSync('MultiSigWalletWithDailyLimit.sol', 'utf8')
};
let compiledContract = solc.compile({sources: input}, 1);
let abi = compiledContract.contracts['MultiSigWalletWithDailyLimit.sol:MultiSigWalletWithDailyLimit'].interface;
let bytecode = '0x'+compiledContract.contracts['MultiSigWalletWithDailyLimit.sol:MultiSigWalletWithDailyLimit'].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let MultiSigWalletWithDailyLimit = web3.eth.contract(JSON.parse(abi));

//owners is tab which contains address for multisig
let owners =["0x1F271047cC3F971D8B2D226A1Af0B5e7DEE5aF10", "0x1F271047cC3F971D8B2D226A1Af0B5e7DEE5aF40"]
//number of required validation
let required = 2;
//Amount in wei, which can be withdrawn without confirmations on a daily basis.
let dailyLimit = 30;

var multi = MultiSigWalletWithDailyLimit.new(owners, required, dailyLimit {
   from:web3.eth.coinbase,
   data:bytecode,
   gas: gasEstimate
 }, function(err, myContract){
    if(!err) {
       if(!myContract.address) {
           console.log(myContract.transactionHash) 
       } else {
           console.log(myContract.address) 
       }
    }
  });