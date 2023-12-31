import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { useContractWrite, useContractRead, useFeeData, usePrepareContractWrite, useSwitchNetwork, useNetwork } from 'wagmi';
import { RegistryAddress, RegistryAbi, AlloAddress, AlloAddressMain, AlloAbi, sepolia_RPC, managerAddress } from "../../contracts";
import Web3 from "web3";
import axios from "axios";
import Header from "../../components/Header";
import "./projectPageStyle.css";

export default function ProjectPage(props) {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [projectData, setProjectData] = useState(null);
    const [loadingProfileId, setLoadingProfileId] = useState(false);
    const [amount, setAmount] = useState(5);

    useEffect(() => {
        if (props.match.params.projectId) {
            getProjectData(props.match.params.projectId)
        }
    }, [props.match.params.projectId]);

    async function getProjectData(projectId) {
        try {
            const data = await axios.post("/project/get-project", { projectId })
            console.log(data);
            setProjectData(data.data.project);
        } catch (error) {

        }
    }

    // FUND POOL FAKE ========================================================
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
            setTimeout(() => {
                updateProject();
            }, 2000);
        }
    });

    async function registerWithAllo() {
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
        } else if (!address) {
            alert("please connect your wallet")
        }
    }

    async function updateProject() {
        setLoadingProfileId(false)
        try {
            const data = await axios.post("/project/update-project", { projectId: projectData._id, contributer: { address, amount }, amount });
            console.log(data);
            getProjectData(props.match.params.projectId)
        } catch (error) {

        }
    }

    // const {
    //     data: fundPoolData,
    //     isLoading: isLoading3,
    //     isSuccess: isSuccess3,
    //     write: fundPoolWrite
    // } = useContractWrite({
    //     address: AlloAddressMain,
    //     abi: AlloAbi,
    //     functionName: 'fundPool',
    //     onError(error) {
    //         console.log('Error', error.toString())
    //         // console.log(error.toString().slice(0,22))
    //         if (error.toString().slice(0, 22) === "ConnectorNotFoundError") {
    //             alert("please recconnect your wallet and try again.")
    //         } else if (error.toString().slice(0, 30) === "ContractFunctionExecutionError") {
    //             alert("you don't have enough money lol");
    //         }
    //     },
    //     onSuccess(data) {
    //         console.log(data);
    //     }
    // });

    // async function fundPool() {
    //     if (fundPoolWrite) {
    //         const blankMetadata = {
    //             protocol: 0,
    //             pointer: ""
    //         };
    //         fundPoolWrite({
    //             args: [
    //                 projectData.alloPoolId, //poolId
    //                 "1000000000", //amount
    //             ],
    //             from: address,
    //         })
    //     } else {
    //         return
    //     }
    // }

    return (
        <div>
            <Header />
            <div id="projectPage">
                <img id="projectImage" src={projectData?.media}></img>
                <div id="projectBody">
                    <div id="projectMain">
                        <div id="projectTitle">
                            {projectData?.title}
                        </div>
                        <div id="projectDescription">
                            {projectData?.description}
                        </div>
                        {/* <div id="projectPoolId">
                    allo pool id: {projectData?.alloPoolId}
                    </div> */}
                        <div id="contibutionTitle">
                            contributers
                        </div>
                        <div id="contributionArea">
                            {projectData?.contributers.length > 0 ?
                                projectData.contributers.map((user, index) => {
                                   return <div className="userAddress">{user.address} : ${user.amount}</div>
                                })
                                :
                                <div id="noComments">
                                    no contributions
                                </div>
                            }
                        </div>
                    </div>
                    <div id="projectSide">
                        <div id="creatorTitle">
                            creator
                        </div>
                        <div id="creatorAddress">
                            {projectData?.creatorAddress}
                        </div>
                        <div id="fundingTitle">
                            funding goal
                        </div>
                        <div id="fundingGoal">
                            {projectData?.goal} (USD)
                        </div>
                        <div id="fundingTitle">
                            total raised
                        </div>
                        <div id="fundingGoal">
                            {projectData?.balance} (USD)
                        </div>
                        <div id="fundingTitle">
                            contribute
                        </div>
                        <div class="ui input createInput contributeInput" >
                            <input type="text" placeholder="title" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div id="contributeBtn" onClick={() => registerWithAllo()}>
                            <div>
                                contribute
                            </div>
                            {loadingProfileId ?
                                <div className="blackLoader">
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}