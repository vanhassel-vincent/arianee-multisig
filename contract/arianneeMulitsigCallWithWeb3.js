//imports 
import * from './web3.js';
let account = new Account("privatekey");
let web3 = new Web3(account, "http://localhost:8545");

//this part can't be achieve without deploy multisig and arianee contract // an address should be like below :
//Multisig
let multiSigContractAddress = "0x1F271047cC3F971D8B2D226A1Af0B5e7DEE5aF20"; 
let multiSigContract = web3.Eth.GetContract(MultiSigExample.Properties.Resources.MultiSigABI, multiSigContractAddress);
//Arianne 
let arianeeContractAddress = "0xf8318fC2BDDc6F46F356EcBEe300064213DA9FA5";
let arianeeContract = web3.Eth.GetContract(MultiSigExample.Properties.Resources.arianeeContractABI, arianeeContractAddress);

//First step : Approve multisig in Arianee contract
//create a call instance for approve function of the arianee contract
let arianeeApproveFunction = arianeeContract.GetFunction("approve");
//multisig contract addrass as data for approve function 
let dataApprove = arianeeApproveFunction.CreateCallInput(multiSigContractAddress).Data;
let byteDataApprove = dataApprove.HexToByteArray();
//call transaction 
let gasApprove = await multiSigExecuteFunction.EstimateGasAsync(arianeeContractAddress, 0, byteDataApprove);
//result of transaction is in transactionHash below
let transactionHashArianeeApprove = await multiSigExecuteFunction.SendTransactionAsync(account.Address, gasApprove, null, arianeeContractAddress, 0, byteDataApprove);

//Second step : start Transfer function in Arianee contract
//new address for arianee certification
let newAddress = "0xf8318fC2BDDc6F46F356EcBEe300064213DA9FA9";
//create a call instance for Transfer function of the arianee contract
let arianeeTransferFunction = arianeeContract.GetFunction("Transfer");
//data for Transfer function
let dataTransfer = arianeeTransferFunction.CreateCallInput(newAddress).Data;
let byteDataTransfer = dataTransfer.HexToByteArray();
//call transaction 
let gasTransfer = await multiSigExecuteFunction.EstimateGasAsync(arianeeContractAddress, 0, byteDataTransfer);
let transactionHashArianneeTransfer = await multiSigExecuteFunction.SendTransactionAsync(account.Address, gasTransfer, null, arianeeContractAddress, 0, byteDataTransfer);


//Third end last step : confirm in multisig the transaction of the Transfer call 
//Multisig validation //need to be done with all address that should confirm the transaction
let multiSigExecuteFunction = multiSigContract.GetFunction("executeTransaction");
let gas = await multiSigExecuteFunction.EstimateGasAsync(arianeeContractAddress, 0, byteDataTransfer);
let transactionHashMultisig = await multiSigExecuteFunction.SendTransactionAsync(account.Address, gas, null, arianeeContractAddress, 0, byteDataTransfer);