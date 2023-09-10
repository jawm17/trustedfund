import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { useContractWrite, useContractRead, useFeeData, usePrepareContractWrite, useSwitchNetwork, useNetwork } from 'wagmi';
import UploadHandler from "../../components/UploadHandler";
import { RegistryAddress, RegistryAbi, AlloAddress, AlloAbi, sepolia_RPC, managerAddress } from "../../contracts";
import Web3 from "web3";
import axios from "axios";
import "./createStyle.css";

export default function Create() {
    var web3 = new Web3(sepolia_RPC);
    const { address, isConnecting, isDisconnected } = useAccount();
    const [AlloProfileId, setAlloProfileId] = useState("");
    const [AlloPoolId, setAlloPoolId] = useState("");

      // ALLO PROFILE CREATION ========================================================
    const {
        data: createProfileData,
        isLoading: isLoading1,
        isSuccess: isSuccess1,
        write: createProfileWrite
    } = useContractWrite({
        address: RegistryAddress,
        abi: RegistryAbi,
        functionName: 'createProfile',
        onError(error) {
            console.log('Error', error.toString())
            // console.log(error.toString().slice(0,22))
            if (error.toString().slice(0, 22) === "ConnectorNotFoundError") {
                alert("please recconnect your wallet and try again.")
            } else if (error.toString().slice(0, 30) === "ContractFunctionExecutionError") {
                alert("you don't have enough money lol");
            }
        },
        onSuccess(data) {
            console.log(data);
            getProfileId(data.hash);
        }
    });

    async function registerWithAllo() {
        if (createProfileWrite && address) {
            const nonce = Math.floor(Date.now() / 1000);
            const blankMetadata = {
                protocol: 0,
                pointer: ""
            };
            createProfileWrite({
                args: [
                    nonce,
                    "testUser",
                    blankMetadata,
                    address,
                    [address]
                ],
                from: address,
            })
        } else {
            return
        }
    }

    async function getProfileId(txHash) {
        try {
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            if (receipt) {
                const log = receipt.logs[1];
                const topic1Value = log.topics[1];
                console.log("Topic 1 Value:", topic1Value);
                setAlloProfileId(topic1Value.toString());
            }
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                getProfileId(txHash);
            }, 2000);
        }
    }

    // ALLO POOL CREATION ========================================================
    const {
        data: createPoolData,
        isLoading: isLoading2,
        isSuccess: isSuccess2,
        write: createPoolWrite
    } = useContractWrite({
        address: AlloAddress,
        abi: AlloAbi,
        functionName: 'createPool',
        onError(error) {
            console.log('Error', error.toString())
            // console.log(error.toString().slice(0,22))
            if (error.toString().slice(0, 22) === "ConnectorNotFoundError") {
                alert("please recconnect your wallet and try again.")
            } else if (error.toString().slice(0, 30) === "ContractFunctionExecutionError") {
                alert("you don't have enough money lol");
            }
        },
        onSuccess(data) {
            console.log(data);
            getPoolData(data.hash);
        }
    });

    async function createPool() {
        if (createPoolWrite) {
            const blankMetadata = {
                protocol: 0,
                pointer: ""
            };
            createPoolWrite({
                args: [
                    "0x07e3f86307e7ffe350bc441cbb3fc87c00291802c4969caf7163b84758733592", //profileId
                    "0xf243619f931c81617EE00bAAA5c5d97aCcC5af10", //strategy
                    "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000", //init strategy data
                    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", //token address
                    0,
                    blankMetadata,
                    [address]
                ],
                from: address,
            })
        } else {
            return
        }
    }

    async function getPoolData(txHash) {
        try {
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            if (receipt) {
                const log = receipt.logs[1];
                const topic1Value = log.topics[1];
                console.log("Pool Id:", topic1Value);
                setAlloPoolId(topic1Value);
            }
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                getPoolData(txHash);
            }, 2000);
        }
    }

    // 0x000000000000000000000000000000000000000000000000000000000000001c

    const {
        data: allocateData,
        isLoading: isLoading3,
        isSuccess: isSuccess3,
        write: allocateWrite
    } = useContractWrite({
        address: AlloAddress,
        abi: AlloAbi,
        functionName: 'fundPool',
        onError(error) {
            console.log('Error', error.toString())
            // console.log(error.toString().slice(0,22))
            if (error.toString().slice(0, 22) === "ConnectorNotFoundError") {
                alert("please recconnect your wallet and try again.")
            } else if (error.toString().slice(0, 30) === "ContractFunctionExecutionError") {
                alert("you don't have enough money lol");
            }
        },
        onSuccess(data) {
            console.log(data);
        }
    });

    async function allocateFunds() {
        if (allocateWrite) {
            const blankMetadata = {
                protocol: 0,
                pointer: ""
            };
            allocateWrite({
                args: [
                    "0x000000000000000000000000000000000000000000000000000000000000001c", //profileId
                    "1000000000", //strategy
                ],
                from: address,
            })
        } else {
            return
        }
    }

    useEffect(() => {
        if (AlloPoolId && AlloProfileId) {
            console.log("we got it!")
        }
    }, [AlloPoolId, AlloProfileId]);

    async function createProject() {
        try {
            const projectData = {
                title: "test",
                description: "description",
                duration: 1,
                goal: 2,
                creatorAddress: address.toLowerCase(),
                alloPoolId: AlloPoolId,
                alloProfileId: AlloProfileId
            }
            const data = await axios.post("/project/new-project", { projectData })
        } catch (error) {

        }
    }

    return (
        <div>
            create
            <div>
                title
            </div>
            <input></input>
            <div>
                description
            </div>
            <UploadHandler />
            <input></input>
            <div>
                funding goal
            </div>
            <input></input>
            <div onClick={() => registerWithAllo()}>
                create Profile
            </div>
            {AlloProfileId ?
                <div onClick={() => createPool()}>
                    create Pool
                </div> :
                null
            }
            {AlloProfileId && AlloPoolId ?
                <div onClick={() => createProject()}>
                    create
                </div>
                : null
            }
        </div>
    );
}