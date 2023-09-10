import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { useContractWrite, useContractRead, useFeeData, usePrepareContractWrite, useSwitchNetwork, useNetwork } from 'wagmi';
import UploadHandler from "../../components/UploadHandler";
import { RegistryAddress, RegistryAbi, AlloAddress, AlloAbi, sepolia_RPC, managerAddress } from "../../contracts";
import Web3 from "web3";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./createStyle.css";


export default function Create() {
    var web3 = new Web3(sepolia_RPC);
    const history = useHistory();
    const { address, isConnecting, isDisconnected } = useAccount();
    const [AlloProfileId, setAlloProfileId] = useState("");
    const [AlloPoolId, setAlloPoolId] = useState("");
    const [loadingProfileId, setLoadingProfileId] = useState(false);
    const [loadingPoolId, setLoadingPoolId] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fundingGoal, setFundingGoal] = useState(0);
    const [image, setImage] = useState("");

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
            setLoadingProfileId(false);
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
        if (title && description && image) {
            setLoadingProfileId(true);
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
        } else {
            console.log(title)
            console.log(description)
            console.log(fundingGoal);
            console.log(image)
            alert("please fill out all fields");
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
        setLoadingPoolId(true);
        if (createPoolWrite) {
            const blankMetadata = {
                protocol: 0,
                pointer: ""
            };
            createPoolWrite({
                args: [
                    AlloProfileId, //profileId
                    "0xf243619f931c81617EE00bAAA5c5d97aCcC5af10", //strategy
                    "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000", //init strategy data
                    "0x7af963cf6d228e564e2a0aa0ddbf06210b38615d", //token address
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

    useEffect(() => {
        if (AlloPoolId && AlloProfileId) {
            createProject();
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
            const data = await axios.post("/project/new-project", { projectData });
            console.log(data)
            history.push("/project/" + data.data.project._id);
        } catch (error) {
            alert("something went wrong");
        }
    }

    return (
        <div id="createPageOuter">
            <div id="createPage">
                <div id="createTitle">
                    create a fundraiser
                </div>
                <div className="inputTitle">
                    title
                </div>
                <div class="ui input createInput" >
                    <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="inputTitle">
                    description
                </div>
                <div class="ui input createInput" >
                    <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <UploadHandler setImage={(url) => setImage(url)} />
                <div className="inputTitle">
                    funding goal
                </div>
                <div class="ui input createInput" >
                    <input type="text" placeholder="funding goal" value={fundingGoal} onChange={(e) => setFundingGoal(e.target.value)} />
                </div>
                {!AlloProfileId && !AlloPoolId ?
                    <div className="contractBtnFlex" onClick={() => registerWithAllo()}>
                        <div className="contractBtn">
                            create allo profile
                        </div>
                        {loadingProfileId ?
                            <div className="blackLoader">
                            </div>
                            : null
                        }
                    </div>
                    :
                    null}
                {AlloProfileId ?
                    <div className="contractBtnFlex" onClick={() => createPool()}>
                        <div className="contractBtn">
                            create pool
                        </div>
                        {loadingPoolId ?
                            <div className="blackLoader">
                            </div>
                            : null
                        }
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}