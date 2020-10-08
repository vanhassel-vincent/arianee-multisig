// const fs = require("fs");
// const solc = require('solc')
// let Web3 = require('web3');
//
// let web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
//
// var input = {
//     'MultiSigWalletWithDailyLimit.sol': fs.readFileSync('MultiSigWalletWithDailyLimit.sol', 'utf8')
// };
// let compiledContract = solc.compile({sources: input}, 1);
// let abi = compiledContract.contracts['MultiSigWalletWithDailyLimit.sol:MultiSigWalletWithDailyLimit'].interface;
// let bytecode = '0x'+compiledContract.contracts['MultiSigWalletWithDailyLimit.sol:MultiSigWalletWithDailyLimit'].bytecode;
// let gasEstimate = web3.eth.estimateGas({data: bytecode});
// let MultiSigWalletWithDailyLimit = web3.eth.contract(JSON.parse(abi));
//
// //owners is tab which contains address for multisig
// let owners =["0x1F271047cC3F971D8B2D226A1Af0B5e7DEE5aF10", "0x1F271047cC3F971D8B2D226A1Af0B5e7DEE5aF40"]
// //number of required validation
// let required = 2;
// //Amount in wei, which can be withdrawn without confirmations on a daily basis.
// let dailyLimit = 30;
//
// var multi = MultiSigWalletWithDailyLimit.new(owners, required, dailyLimit {
//    from:web3.eth.coinbase,
//    data:bytecode,
//    gas: gasEstimate
//  }, function(err, myContract){
//     if(!err) {
//        if(!myContract.address) {
//            console.log(myContract.transactionHash)
//        } else {
//            console.log(myContract.address)
//        }
//     }
//   });
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to local Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Compile the source code
const input = fs.readFileSync('MultiSigWalletWithDailyLimit.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':MultiSigWalletWithDailyLimit'].bytecode;
const abi = JSON.parse(output.contracts[':MultiSigWalletWithDailyLimit'].interface);
var myContract = new web3.eth.Contract(abi, {
    from: '0xdEc1F6545febbF143BA602DC17297c0b013750d6', // default from address
    gasPrice: '20000000' // default gas price in wei, 20 gwei in this case
});
myContract.deploy({
    data: bytecode
})
.send({
    from: '0xdEc1F6545febbF143BA602DC17297c0b013750d6',
    gas: 500000,
    gasPrice: '20000000'
}, function(error, transactionHash){})
.on('error', function(error){ console.log("error2"); })
.on('transactionHash', function(transactionHash){ console.log(transactionHash); })
.on('receipt', function(receipt){
// contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});

  /////////////////////////////////////
