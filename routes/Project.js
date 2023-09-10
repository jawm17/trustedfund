const express = require('express');
const projectRouter = express.Router();
const User = require('../models/User');
const Project = require("../models/Project");
const { Network, Alchemy } = require("alchemy-sdk");
var Web3 = require("web3");
const { RegistryAddress, RegistryAbi, AlloAddress, AlloAbi, sepolia_RPC, sepoliaAlchemyApiKey } = require("../contracts");

// instantiate web3 values
var web3 = new Web3(sepolia_RPC);
web3.eth.Contract.setProvider(sepolia_RPC);
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// AlloContract = new web3.eth.Contract(AlloAbi, AlloAddress);
RegistryContract = new web3.eth.Contract(RegistryAbi, RegistryAddress);

const settings = {
    apiKey: sepoliaAlchemyApiKey,
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

const message = { msgBody: "Error has occured", msgError: true };

// monitorTokenSends();

async function monitorTokenSends() {
    // This is the "transfer event" topic we want to watch.
    const mintTopic = "0x1e28352ff00d67474b59b87e6817d6ba65daa0130446266db8640214d8b80609";
    // This is the "from address" we want to watch.
    const zeroTopic = "0x0000000000000000000000000000000000000000000000000000000000000000";
    // This is the NFT contract we want to watch.
    const nftContractAddress = RegistryAddress;

    // Create the log options object.
    const mintEvents = {
        address: nftContractAddress,
        topics: [mintTopic],
    };

    const doSomethingWithTxn = (txn) => {
        let transaction = web3.eth.abi.decodeLog([{
            type: 'bytes32',
            name: 'profileId',
            indexed: true
        }, {
            type: 'uint256',
            name: 'nonce',
            indexed: true
        }, {
            type: 'string',
            name: 'name',
            indexed: true
        },
        {
            type: 'tuple',
            name: 'metadata',
            indexed: true
        }, {
            type: 'address',
            name: 'owner',
            indexed: true
        }, {
            type: 'address',
            name: 'anchor',
            indexed: true
        }],
            txn.data,
            [txn.topics[1], txn.topics[2], txn.topics[3], txn.topics[4], txn.topics[5], txn.topics[6]]);

        console.log(`\n` +
            `owner: ${transaction.owner}` +
            `name: ${transaction.name}\n`
        );
    }

    // Open the websocket and listen for events!
    alchemy.ws.on(mintEvents, doSomethingWithTxn);
}

async function isAddressRegistered(address) {
    try {
        const registered = await RegistryContract.methods.getProfileByAnchor(address).call();
        console.log(registered);
        return registered;
    } catch (error) {
        console.error("Error checking registration status:", error);
        return false;
    }
}

test();

async function test() {
    const receipt = await web3.eth.getTransactionReceipt("0x3e34261877b8e8b1d3d719db50918620ad2be7134e64eaaf30a8cfb3ca67a37b")
    // const profileCreatedEvent = data.events.ProfileCreated;
    // const profileId = profileCreatedEvent.returnValues.profileId;
    // console.log("Profile ID:", profileId);
    // Define the ABI for the ProfileCreated event
    const log = receipt.logs[1]; // Assuming the second log is the one you're interested in
    const topic1Value = log.topics[1];
    console.log("Topic 1 Value:", topic1Value);

}

const addressToCheck = "0x1032c4139825ADdD584961d4657a880925847Dd1"; // Replace with the address you want to check
// isAddressRegistered(addressToCheck).then(isRegistered => {
//     if (isRegistered) {
//         console.log("Address is registered.");
//     } else {
//         console.log("Address is not registered.");
//     }
// });

projectRouter.post('/new-project', async (req, res) => {
    const { projectData } = req.body;
    console.log(projectData)
    // check if user already exists
    const newProject = new Project(projectData);
    newProject.save((err, project) => {
        if (err) {
            // console.log(err)
            res.status(500).json({ message });
        }
        else {
            res.status(200).json({ project });
        }
    });
});

projectRouter.post('/get-project', async (req, res) => {
    const { projectId } = req.body;
    // check if user already exists
    Project.findById({_id: projectId }, async (err, project) => {
        if (err) res.status(500).json({ message });
        else if (project) {
            res.status(200).json({ project });
        } else {
            res.status(500).json({ message });
        }
    });
});

projectRouter.post('/update-project', async (req, res) => {
    const { projectId, contributer, amount } = req.body;
    console.log(req.body)
    // check if user already exists
    Project.findOneAndUpdate({ _id: projectId }, { $push: { contributers: contributer }, "$inc": { "balance": amount } }).exec((err, document) => {
        if (err){
            console.log(err);
            res.status(500).json({ message });
        } 
         else {
            res.status(201).json({ document });
        }
    });
});

module.exports = projectRouter;