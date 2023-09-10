import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { useContractWrite, useContractRead, useFeeData, usePrepareContractWrite, useSwitchNetwork, useNetwork } from 'wagmi';
import { RegistryAddress, RegistryAbi, AlloAddress, AlloAddressMain, AlloAbi, sepolia_RPC, managerAddress } from "../../contracts";
import Web3 from "web3";
import axios from "axios";
import "./projectPageStyle.css";

export default function ProjectPage(props) {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        if(props.match.params.projectId) {
            getProjectData(props.match.params.projectId)
        }
    }, [props.match.params.projectId]);

    async function getProjectData() {
        try {
            const data = await axios.post("/project/get-project", {projectId: props.match.params.projectId})
            console.log(data);
            setProjectData(data.data.project);
        } catch (error) {
            
        }
    }

    const {
        data: fundPoolData,
        isLoading: isLoading3,
        isSuccess: isSuccess3,
        write: fundPoolWrite
    } = useContractWrite({
        address: AlloAddressMain,
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

    async function fundPool() {
        if (fundPoolWrite) {
            const blankMetadata = {
                protocol: 0,
                pointer: ""
            };
            fundPoolWrite({
                args: [
                    projectData.alloPoolId, //poolId
                    "1000000000", //amount
                ],
                from: address,
            })
        } else {
            return
        }
    }

    return (
        <div>
            project
            <div onClick={() => fundPool()}>
                fund
            </div>
        </div>
    );
}