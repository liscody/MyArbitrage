import * as dotenv from "dotenv";
dotenv.config();

import { task, types } from "hardhat/config";
import { TetherToken, Erc20 } from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { token } from "../typechain-types/@openzeppelin/contracts";
import { network } from "hardhat";

const privateKey = process.env.PRIVATE_KEY || "";

// task("deployRsp", "Deploy RSP game & verify it.").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("");
//     console.log("Deploying all contracts started ...");
//     // --- deploy contracts ---
//     const revealTime = oneMinute * 15;
//     const closeRoomDeadline = oneMinute * 15;
//     const fee = 1000; // 10 %
//     const minBetAmount = 100;
//     const commissionaireAddress = commissionaireAddr;
//     //
//     console.log("Deploying with params: ");
//     console.log("revealTime: ", revealTime);
//     console.log("closeRoomDeadline: ", closeRoomDeadline);
//     console.log("fee: ", fee);
//     console.log("minBetAmount: ", minBetAmount);
//     console.log("commissionaireAddress: ", commissionaireAddress);
//     //
//     console.log("Start deploy Rsp contract");
//     const Rsp = await ethers.getContractFactory("Rsp");
//     const rsp = <Rsp>(
//         await upgrades.deployProxy(Rsp, [revealTime, closeRoomDeadline, fee, minBetAmount, commissionaireAddress])
//     );
//     await rsp.deployed();
//     console.log("Rsp was deployed at address: ", rsp.address);
//     console.log("");
//     console.log("");
//     //
//     console.log("Slip 100 sec before verify");
//     console.log("");
//     await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.
//     //
//     try {
//         await run("verify:verify", {
//             address: rsp.address,
//             constructorArguments: []
//         }).then(
//             () => {
//                 // if (needToLog)
//                 console.log("Successfully verified.\n");
//             },
//             (error) => {
//                 const reason = new Error(JSON.stringify(error)).message;
//                 if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                 else
//                     console.log(
//                         `Error. The verification is failed for a contract with the address ${rsp.address}.\n` +
//                             `Reason: ${reason}\n`
//                     );
//             }
//         );
//     } catch (error) {
//         console.log(
//             `Error after verification of a contract with the address ${rsp.address}.\n` +
//                 `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//         );
//     }
//     console.log("Add this variables for further use:");
//     console.log("");
//     console.log('const rpsAddr = "' + rsp.address + '";');
//     console.log("");
//     console.log("");
//     console.log("🚀 ~ Congrats --- Contracts successfully deployed and verified");
// });
// // npx hardhat deployRsp --network sepolia
// // npx hardhat deployRsp --network mumbai
// // npx hardhat deployRsp --network arbitrumTestnet
// // npx hardhat deployRsp --network localhost

// task("account", "returns nonce and balance for specified address on multiple networks")
//     .addParam("address")
//     .setAction(async (taskArgs, { ethers, upgrades, run }) => {
//         // const web3Goerli = createAlchemyWeb3(API_URL_SEPOLIA);
//         // const web3Mumbai = createAlchemyWeb3(API_URL_MUMBAI);
//         // const web3BinanceTestnet = createAlchemyWeb3(API_URL_BINANCE_TESTNET);
//         // const web3Arb = createAlchemyWeb3(API_URL_ARBITRUM);
//         // const web3Opt = createAlchemyWeb3(API_URL_OPTIMISM);

//         const web3Sepolia = new ethers.providers.JsonRpcProvider(sepoliaUrl);
//         const web3Mumbai = new ethers.providers.JsonRpcProvider(mumbaiUrl);
//         const web3ArbitrumTestnet = new ethers.providers.JsonRpcProvider(arbitrumTestnetUrl);

//         const networkIDArr = ["Sepolia", "Mumbai", "ArbitrumTestnet"];
//         const providerArr = [web3Sepolia, web3Mumbai, web3ArbitrumTestnet];
//         const resultArr = [];

//         for (let i = 0; i < providerArr.length; i++) {
//             // get nonce and balance
//             const nonce = await providerArr[i].getTransactionCount(taskArgs.address, "latest");
//             const balance = await providerArr[i].getBalance(taskArgs.address);

//             resultArr.push([networkIDArr[i], nonce, ethers.utils.formatEther(balance)]);
//             console.log("i: ", i);
//         }
//         resultArr.unshift([" |NETWORK| |NONCE| |BALANCE| "]);
//         console.log(resultArr);

//         // increase nonce for each network to same value
//         const nonceSepolia = await web3Sepolia.getTransactionCount(taskArgs.address, "latest");
//         const nonceMumbai = await web3Mumbai.getTransactionCount(taskArgs.address, "latest");
//         const nonceArbitrumTestnet = await web3ArbitrumTestnet.getTransactionCount(taskArgs.address, "latest");

//         console.log("nonceSepolia: ", nonceSepolia);
//         console.log("nonceMumbai: ", nonceMumbai);
//         console.log("nonceArbitrumTestnet: ", nonceArbitrumTestnet);

//         // get biggest nonce
//         const maxNonce = Math.max(nonceSepolia, nonceMumbai, nonceArbitrumTestnet);
//         console.log("maxNonce: ", maxNonce);

//         // get signers
//         const deployer = await ethers.getSigner(ownerAddress);

//         // check nonceSepolia, nonceMumbai, nonceArbitrumTestnet is the same
//         // if same - stop function
//         if (nonceSepolia === nonceMumbai && nonceSepolia === nonceArbitrumTestnet) {
//             console.log("All nonces are the same");
//             return;
//         }

//         if (maxNonce > nonceSepolia) {
//             console.log("Actions for Sepolia started ...");
//             const wallet = new ethers.Wallet(privateKey, web3Sepolia);
//             // Set the gas price (optional)
//             const gasPrice = await web3Sepolia.getGasPrice();

//             // Create a transaction
//             const transaction = {
//                 to: deployer.address,
//                 value: ethers.utils.parseEther("0"), // You can set the value if you want to send ETH
//                 nonce: nonceSepolia,
//                 gasLimit: 21000, // You may adjust the gas limit as needed
//                 gasPrice: gasPrice
//             };
//             // Sign the transaction
//             const signedTransaction = await wallet.signTransaction(transaction);
//             // Send the transaction
//             const tx = await web3Sepolia.sendTransaction(signedTransaction);
//             // Wait for the transaction to be mined (optional)
//             await tx.wait();
//             const currentNonce = await web3Sepolia.getTransactionCount(taskArgs.address, "latest");
//             console.log(`Transaction sent with nonce: ${currentNonce}`);
//         }

//         if (maxNonce > nonceMumbai) {
//             console.log("Actions for Mumbai started ...");
//             const wallet = new ethers.Wallet(privateKey, web3Mumbai);
//             // Set the gas price (optional)
//             const gasPrice = await web3Mumbai.getGasPrice();

//             // Create a transaction
//             const transaction = {
//                 to: deployer.address,
//                 value: ethers.utils.parseEther("0"), // You can set the value if you want to send ETH
//                 nonce: nonceMumbai,
//                 gasLimit: 21000, // You may adjust the gas limit as needed
//                 gasPrice: gasPrice
//             };
//             // Sign the transaction
//             const signedTransaction = await wallet.signTransaction(transaction);
//             // Send the transaction
//             const tx = await web3Mumbai.sendTransaction(signedTransaction);
//             // Wait for the transaction to be mined (optional)
//             await tx.wait();
//             const currentNonce = await web3Mumbai.getTransactionCount(taskArgs.address, "latest");
//             console.log(`Transaction sent with nonce: ${currentNonce}`);
//         }

//         if (maxNonce > nonceArbitrumTestnet) {
//             console.log("Actions for ArbitrumTestnet started ...");
//             const wallet = new ethers.Wallet(privateKey, web3ArbitrumTestnet);
//             const gasPrice = await web3Mumbai.getGasPrice();

//             // Create a transaction
//             const transaction = {
//                 to: deployer.address,
//                 value: ethers.utils.parseEther("0"), // You can set the value if you want to send ETH
//                 nonce: nonceArbitrumTestnet,
//                 gasLimit: 2100000, // You may adjust the gas limit as needed
//                 gasPrice: gasPrice
//             };
//             // Sign the transaction
//             const signedTransaction = await wallet.signTransaction(transaction);
//             // Send the transaction
//             const tx = await web3ArbitrumTestnet.sendTransaction(signedTransaction);
//             // Wait for the transaction to be mined (optional)
//             await tx.wait();
//             const currentNonce = await web3ArbitrumTestnet.getTransactionCount(taskArgs.address, "latest");
//             console.log(`Transaction sent with nonce: ${currentNonce}`);
//         }
//     });
// // npx hardhat account --address 0x52abc3f669B8e7724BE9BffCb354051Cc8EeaAae

// task("setBaseReferrer", "returns nonce and balance for specified address on multiple networks")
//     // .addParam("address")
//     .setAction(async (taskArgs, { ethers, upgrades, run }) => {
//         console.log("setBaseReferrer started ...");

//         const rsp = (await ethers.getContractAt("Rsp", rpsAddr)) as RockPaperScissors;
//         const usdt = (await ethers.getContractAt("TetherToken", usdtAddr)) as TetherToken;
//         const token = (await ethers.getContractAt("Erc20", tokenAddr)) as Erc20;

//         const owner = await ethers.getSigner(ownerAddress);
//         const referer = owner.address;

//         const tx = await rsp.connect(owner).setBaseReferrer(referer);
//         await tx.wait();

//         const res = await rsp.baseReferrer();
//         console.log("baseReferrer: ", res);

//         console.log("setBaseReferrer done");
//     });

// // npx hardhat setBaseReferrer --network sepolia
// // npx hardhat setBaseReferrer --network mumbai
// // npx hardhat setBaseReferrer --network arbitrumTestnet

// task("estimateContractAddress", "Get contract address before deploy").setAction(
//     async (taskArgs, { ethers, upgrades, run }) => {
//         // get nonce
//         const deployer = await ethers.getSigner(ownerAddress);
//         const nonce = await deployer.getTransactionCount();

//         // Create a contract address using the deployer address and nonce
//         const contractAddress = ethers.utils.getContractAddress({
//             from: deployer.address,
//             nonce: nonce
//         });
//         console.log("Estimated Contract Address:", contractAddress);
//     }
// );
// // npx hardhat estimateContractAddress --network mumbai
// // npx hardhat estimateContractAddress --network sepolia
// // npx hardhat estimateContractAddress --network arbitrumTestnet

// task("upgRsp", "Upgrade contracts").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("Starting upgrade contracts ...");

//     const RspV1 = await ethers.getContractFactory("Rsp");
//     await upgrades.forceImport(rpsAddr, RspV1);

//     console.log("forceImport done");

//     // upgrade Rsp
//     const Rsp = await ethers.getContractFactory("Rsp");
//     const rsp = await upgrades.upgradeProxy(rpsAddr, Rsp);
//     await rsp.deployed();

//     // get signers
//     console.log("rsp: ", rsp.address);

//     console.log("slip 60 sec");
//     await new Promise((resolve) => setTimeout(resolve, 6000)); // 60 seconds.

//     console.log("Start verify Rsp contract");

//     try {
//         await run("verify:verify", {
//             address: rsp.address,
//             constructorArguments: []
//         }).then(
//             () => {
//                 // if (needToLog)
//                 console.log("Successfully verified.\n");
//             },
//             (error) => {
//                 const reason = new Error(JSON.stringify(error)).message;
//                 if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                 else
//                     console.log(
//                         `Error. The verification is failed for a contract with the address ${rsp.address}.\n` +
//                             `Reason: ${reason}\n`
//                     );
//             }
//         );
//     } catch (error) {
//         console.log(
//             `Error after verification of a contract with the address ${rsp.address}.\n` +
//                 `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//         );
//     }

//     console.log("Successfully upgrade ");
// });
// // npx hardhat upgRsp --network mumbai
// // npx hardhat upgRsp --network sepolia
// // npx hardhat upgRsp --network arbitrumTestnet

// task("shareBalances", "Transfer tokens to addrs").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("Transfer tokens started ...");

//     const usdt = (await ethers.getContractAt("TetherToken", usdtAddr)) as TetherToken;
//     // const erc20 = (await ethers.getContractAt("Erc20", tokenAddr)) as Erc20;

//     const deployer = await ethers.getSigner(ownerAddress);
//     // const amount = ethers.utils.parseUnits("100", 6);

//     // // transfer eth
//     // // get balance of deployer
//     // const balance = await deployer.getBalance();
//     // console.log("Balance: ", balance.toString());
//     // const targetAmount = balance.div(3)

//     // // transfer eth to player A
//     // const tx1 = await deployer.sendTransaction({
//     //     to: playerAAddress,
//     //     value: targetAmount
//     // });
//     // await tx1.wait();
//     // console.log("Transfer ETH to player A done");

//     // // transfer eth to player B
//     // const tx2 = await deployer.sendTransaction({
//     //     to: playerBAddress,
//     //     value: targetAmount
//     // });
//     // await tx2.wait();
//     // console.log("Transfer ETH to player B done");

//     // // check balances after transfer
//     // const balanceAfter = await deployer.getBalance();
//     // console.log("Balance after: ", balanceAfter.toString());
//     // const balanceAEth = await ethers.provider.getBalance(playerAAddress);
//     // console.log("Balance A: ", balanceAEth.toString());
//     // const balanceBEth = await ethers.provider.getBalance(playerBAddress);
//     // console.log("Balance B: ", balanceBEth.toString());

//     // check balances before transfer
//     const balanceDeployer = await usdt.connect(deployer).balanceOf(ownerAddress);
//     console.log("Balance deployer: ", balanceDeployer.toString());
//     const balanceA = await usdt.connect(deployer).balanceOf(playerAAddress);
//     console.log("Balance A: ", balanceA.toString());
//     const balanceB = await usdt.connect(deployer).balanceOf(playerBAddress);
//     console.log("Balance B: ", balanceB.toString());

//     const usdtAmount = balanceDeployer.div(3);

//     const tx = await usdt.connect(deployer).transfer(playerAAddress, usdtAmount);
//     await tx.wait();
//     console.log("Transfer USDT to player A done");

//     const tx3 = await usdt.connect(deployer).transfer(playerBAddress, usdtAmount);
//     await tx3.wait();
//     console.log("Transfer USDT to player B done");

//     // check balances after transfer
//     const balanceAAfter = await usdt.connect(deployer).balanceOf(playerAAddress);
//     console.log("Balance A after: ", balanceAAfter.toString());
//     const balanceBAfter = await usdt.connect(deployer).balanceOf(playerBAddress);
//     console.log("Balance B after: ", balanceBAfter.toString());

//     // const tx3 = await erc20.connect(deployer).transfer(playerA.address, amount);
//     // await tx3.wait();
//     // console.log("Transfer ERC20 to player A done");

//     // const tx4 = await erc20.connect(deployer).transfer(playerB.address, amount);
//     // await tx4.wait();
//     // console.log("Transfer ERC20 to player B done");
// });

// // npx hardhat shareBalances --network mumbai
// // npx hardhat shareBalances --network sepolia
// // npx hardhat shareBalances --network arbitrumTestnet

// task("checkBalances", "Check balances in all chains").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     // get instance of tokens
//     const usdt = <TetherToken>await ethers.getContractAt("TetherToken", usdtAddr);
//     const erc20 = <Erc20>await ethers.getContractAt("Erc20", tokenAddr);

//     // target addrs
//     const addrs = [
//         // "0x249918f7222661308cBd15c70e2ab4f8C4A6d4D9", // Shady
//         ownerAddress, // deployer address
//         playerAAddress, // Arny
//         playerBAddress // Sara
//     ];

//     // get provider for arbitrum
//     const providerArbitrum = new ethers.providers.JsonRpcProvider(arbitrumTestnetUrl);
//     // get provider for mumbai
//     const providerMumbai = new ethers.providers.JsonRpcProvider(mumbaiUrl);
//     // get provider for sepolia
//     const providerSepolia = new ethers.providers.JsonRpcProvider(sepoliaUrl);

//     // get balances
//     for (const addr of addrs) {
//         // get balances in arbitrum
//         console.log("");
//         console.log("get balances in arbitrum");

//         const ethBalanceArbitrum = await providerArbitrum.getBalance(addr);
//         const usdtBalanceArbitrum = await usdt.connect(providerArbitrum).balanceOf(addr);
//         const erc20BalanceArbitrum = await erc20.connect(providerArbitrum).balanceOf(addr);
//         console.log("eth balance ", ethBalanceArbitrum);
//         console.log("usdt balance ", usdtBalanceArbitrum);
//         // console.log("erc20 balance ", erc20BalanceArbitrum);
//         console.log("get balances in mumbai");
//         // get balances in mumbai
//         const ethBalanceMumbai = await usdt.connect(providerMumbai).balanceOf(addr);
//         const usdtBalanceMumbai = await usdt.connect(providerMumbai).balanceOf(addr);
//         const erc20BalanceMumbai = await erc20.connect(providerMumbai).balanceOf(addr);
//         console.log("eth balance ", ethBalanceMumbai);
//         console.log("usdt balance ", usdtBalanceMumbai);
//         // console.log("erc20 balance ", erc20BalanceMumbai);
//         console.log("get balances in sepolia");
//         // get balances in sepolia
//         const ethBalanceSepolia = await usdt.connect(providerSepolia).balanceOf(addr);
//         const usdtBalanceSepolia = await usdt.connect(providerSepolia).balanceOf(addr);
//         const erc20BalanceSepolia = await erc20.connect(providerSepolia).balanceOf(addr);
//         console.log("eth balance ", ethBalanceSepolia);
//         console.log("usdt balance ", usdtBalanceSepolia);
//         // console.log("erc20 balance ", erc20BalanceSepolia);
//     }
// });

// // npx hardhat checkBalances --network mumbai

// task("deployAllContracts", "Deploy new contract").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("");
//     console.log("Deploying all contracts started ...");
//     // const deployer = await ethers.getSigner(ownerAddress);

//     // console.log("Deploying Rsp... from address", deployer.address);

//     // --- deploy contracts ---
//     // # 1. Deployment.
//     const revealTime = oneMinute * 15;
//     const closeRoomDeadline = oneMinute * 15;
//     const fee = 1000; // 10 %
//     const minBetAmount = 100;
//     const commissionaireAddress = commissionaireAddr;

//     console.log("Deploying Rsp...");

//     const Rsp = await ethers.getContractFactory("Rsp");
//     const rsp = <Rsp>(
//         await upgrades.deployProxy(Rsp, [revealTime, closeRoomDeadline, fee, minBetAmount, commissionaireAddress])
//     );
//     await rsp.deployed();

//     console.log("Rsp was deployed at address: ", rsp.address);

//     console.log("slip 60 sec");
//     console.log("");
//     await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.

//     try {
//         await run("verify:verify", {
//             address: rsp.address,
//             constructorArguments: []
//         }).then(
//             () => {
//                 // if (needToLog)
//                 console.log("Successfully verified.\n");
//             },
//             (error) => {
//                 const reason = new Error(JSON.stringify(error)).message;
//                 if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                 else
//                     console.log(
//                         `Error. The verification is failed for a contract with the address ${rsp.address}.\n` +
//                             `Reason: ${reason}\n`
//                     );
//             }
//         );
//     } catch (error) {
//         console.log(
//             `Error after verification of a contract with the address ${rsp.address}.\n` +
//                 `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//         );
//     }

//     // // # 3. Deployment of USDT token
//     // const TetherToken = await ethers.getContractFactory("TetherToken");
//     // const usdt = await TetherToken.deploy(
//     //     1000000000000, // total supply of the token
//     //     "Tether USD", // name of the token
//     //     "USDT", // symbol of the token
//     //     6 // decimals of the token
//     // );
//     // await usdt.deployed();

//     // console.log("TetherToken was deployed at address: ", usdt.address);
//     // console.log("");
//     // console.log("slip 100 sec");
//     // await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.

//     // try {
//     //     await run("verify:verify", {
//     //         address: usdt.address,
//     //         constructorArguments: [
//     //             1000000000000, // total supply of the token
//     //             "Tether USD", // name of the token
//     //             "USDT", // symbol of the token
//     //             6 // decimals of the token
//     //         ]
//     //     }).then(
//     //         () => {
//     //             // if (needToLog)
//     //             console.log("Successfully verified.\n");
//     //         },
//     //         (error) => {
//     //             const reason = new Error(JSON.stringify(error)).message;
//     //             if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//     //             else
//     //                 console.log(
//     //                     `Error. The verification is failed for a contract with the address ${usdt.address}.\n` +
//     //                         `Reason: ${reason}\n`
//     //                 );
//     //         }
//     //     );
//     // } catch (error) {
//     //     console.log(
//     //         `Error after verification of a contract with the address ${usdt.address}.\n` +
//     //             `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//     //     );
//     // }

//     // // # 4. Deployment of token for testing
//     // const Token = await ethers.getContractFactory("Erc20");
//     // const token = await Token.deploy();
//     // await token.deployed();

//     // console.log("Token was deployed at address: ", token.address);
//     // console.log("");
//     // console.log("slip 100 sec");

//     // // await 100 sec
//     // await new Promise((resolve) => setTimeout(resolve, 100000)); // 100 seconds.

//     // try {
//     //     await run("verify:verify", { address: token.address, constructorArguments: [] }).then(
//     //         () => {
//     //             // if (needToLog)
//     //             console.log("Successfully verified.\n");
//     //         },
//     //         (error) => {
//     //             const reason = new Error(JSON.stringify(error)).message;
//     //             if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//     //             else
//     //                 console.log(
//     //                     `Error. The verification is failed for a contract with the address ${token.address}.\n` +
//     //                         `Reason: ${reason}\n`
//     //                 );
//     //         }
//     //     );
//     // } catch (error) {
//     //     console.log(
//     //         `Error after verification of a contract with the address ${token.address}.\n` +
//     //             `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//     //     );
//     // }

//     console.log("");
//     console.log("=============================================");
//     console.log("=============================================");
//     console.log("Add this variables for further use:");
//     console.log("");
//     console.log("const rpsAddr = '", rsp.address, "';");
//     // console.log("const usdtAddr = '", usdt.address, "';");
//     // console.log("const token = '", token.address, "';");
//     console.log("");
//     console.log("");
//     console.log("🚀 ~ Congrats --- Contracts successfully deployed and verified");
// });
// // npx hardhat deployAllContracts --network mumbai
// // npx hardhat deployAllContracts --network sepolia
// // npx hardhat deployAllContracts --network arbitrumTestnet

// // npx hardhat verify 0x321613975711a4854c9762BE562488D0457ADB1D --network arbitrumTestnet

// // check nonce
// task("checkNonce", "Check nonce").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("");
//     console.log("Check nonce started ...");
//     const deployer = await ethers.getSigner(ownerAddress);

//     console.log("Check nonce from address", deployer.address);

//     const nonce = await deployer.getTransactionCount();
//     console.log("Nonce is ", nonce);

//     console.log("");
//     console.log("");
//     console.log("🚀 ~ Congrats --- Nonce successfully checked");
// });

// // npx hardhat checkNonce --network mumbai
// // npx hardhat checkNonce --network sepolia
// // npx hardhat checkNonce --network arbitrumTestnet

// // check nonce
// task("increaseNonce", "Check nonce").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("");
//     console.log("Check nonce started ...");
//     const deployer = await ethers.getSigner(ownerAddress);

//     let nonce = await deployer.getTransactionCount();
//     console.log("Nonce is ", nonce);
//     const tx = await deployer.sendTransaction({
//         to: "0xe266c6fb5927a3793aB476e55f87605b50D2B20A",
//         gasLimit: 21000
//     });
//     tx.wait();
//     console.log("Congrats --- Nonce successfully checked");
// });

// // npx hardhat increaseNonce --network mumbai
// // npx hardhat increaseNonce --network sepolia
// // npx hardhat increaseNonce --network arbitrumTestnet

// // clear nonce
// task("clearNonce", "Clear nonce").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("");
//     console.log("Clear nonce started ...");
//     // const deployer = await ethers.getSigner(ownerAddress);

//     // const nonce = await deployer.getTransactionCount();
//     // console.log("Nonce is ", nonce);

//     // const tx = await deployer.sendTransaction({
//     // to: deployer.address,
//     // gasLimit: 21000,
//     // nonce: nonce
//     // });
//     // tx.wait();

//     console.log("Congrats --- Nonce successfully cleared");
// });

// // npx hardhat clearNonce --network mumbai
// // npx hardhat clearNonce --network sepolia
// // npx hardhat clearNonce --network arbitrumTestnet

// // transfer balance
// task("sendBalance", "Send balance").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("");
//     console.log("Send balance started ...");
//     // const deployer = await ethers.getSigner(ownerAddress);

//     // const currentBalance = await deployer.getBalance();
//     // console.log("Current balance is ", currentBalance.toString());
//     // const amount = ethers.utils.parseEther("2");

//     // const tx = await deployer.sendTransaction({
//     // to: deployer.address,
//     // gasLimit: 21000,
//     // value: amount.sub(ethers.utils.parseEther("0.1"))
//     // });
//     // tx.wait();

//     // // check balance
//     // const newBalance = await deployer.getBalance();
//     // console.log("New balance is ", newBalance.toString());
// });

// task("upgRspContract", "Upgrade contracts").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("Starting upgrade contracts ...");

//     // // To register a previously deployed proxy for upgrading, use the forceImport function.
//     // const RspV1 = await ethers.getContractFactory("Rsp");
//     // await upgrades.forceImport(rpsAddr, RspV1);

//     // upgrade rps contract
//     console.log("Upgrade rps started ...");

//     const Rsp = await ethers.getContractFactory("Rsp");

//     const rps = await upgrades.upgradeProxy(rpsAddr, Rsp);

//     await rps.deployed();
//     console.log("rps: ", rps.address);

//     console.log("slip 60 sec");
//     await new Promise((resolve) => setTimeout(resolve, 6000)); // 60 seconds.

//     console.log("Start verify rps contract");
//     try {
//         await run("verify:verify", { address: rps.address, constructorArguments: [] }).then(
//             () => {
//                 // if (needToLog)
//                 console.log("Successfully verified.\n");
//             },
//             (error) => {
//                 const reason = new Error(JSON.stringify(error)).message;
//                 if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                 else
//                     console.log(
//                         `Error. The verification is failed for a contract with the address ${rps.address}.\n` +
//                             `Reason: ${reason}\n`
//                     );
//             }
//         );
//     } catch (error) {
//         console.log(
//             `Error after verification of a contract with the address ${rps.address}.\n` +
//                 `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//         );
//     }
//     console.log("Successfully upgrade rps");
// });
// // npx hardhat upgRspContract --network mumbai
// // npx hardhat upgRspContract --network sepolia
// // npx hardhat upgRspContract --network arbitrumTestnet

// task("deployAndConnectToProxy", "Upgrade contracts").setAction(async (taskArgs, { ethers, upgrades, run }) => {
//     console.log("Starting upgrade contracts ...");

//     // upgrade rsp contract
//     console.log("Upgrade rsp started ...");

//     // deploy rsp implementation
//     const Rsp = await ethers.getContractFactory("Rsp");
//     const rsp = await Rsp.deploy();
//     await rsp.deployed();

//     console.log("slip 60 sec");
//     await new Promise((resolve) => setTimeout(resolve, 6000)); // 60 seconds.

//     console.log("Start verify rsp contract");
//     try {
//         await run("verify:verify", { address: rsp.address, constructorArguments: [] }).then(
//             () => {
//                 // if (needToLog)
//                 console.log("Successfully verified.\n");
//             },
//             (error) => {
//                 const reason = new Error(JSON.stringify(error)).message;
//                 if (reason.includes("Already Verified")) console.log("The contract has already been verified.\n");
//                 else
//                     console.log(
//                         `Error. The verification is failed for a contract with the address ${rsp.address}.\n` +
//                             `Reason: ${reason}\n`
//                     );
//             }
//         );
//     } catch (error) {
//         console.log(
//             `Error after verification of a contract with the address ${rsp.address}.\n` +
//                 `First 120 characters of the reason: ${new Error(JSON.stringify(error)).message.slice(0, 120)}.\n`
//         );
//     }

//     console.log("Successfully upgrade rsp");
// });
// // npx hardhat upgRspContract --network mumbai
// // npx hardhat deployAndConnectToProxy --network sepolia
// // npx hardhat upgRspContract --network arbitrumTestnet

// // npx hardhat sendBalance --network mumbai
// // npx hardhat sendBalance --network sepolia
// // npx hardhat sendBalance --network arbitrumTestnet

// // npx hardhat verify 0xBBadacC8ba329E1898b7e5f91d7C3c4647719A93 --network mumbai
