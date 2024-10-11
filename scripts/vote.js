const hre = require("hardhat");

function printCandidates(candidates) {
    for (const candidate of candidates) {
        console.log(`${candidate.name} with votes ${candidate.votingCount}`);
    }
}

function printWinner(winner) {
    for (let i = 0; i < winner.length; i++) {
        console.log(`Printing ${winner}`);
    }
}

async function main() {
    const [voter1, voter2, voter3, voter4, voter5] = await hre.ethers.getSigners();

    const VotingDapp = await hre.ethers.getContractFactory("Voting");
    const votingDapp = await VotingDapp.deploy(["Ron", "Harry", "Hermione", "Voldemort"]);
    await votingDapp.waitForDeployment();
    console.log("Contract deployed to: ", await votingDapp.getAddress());

    // Get initial votes
    console.log("--INITIAL--");
    let candidates = await votingDapp.getCandidates();
    printCandidates(candidates);

    // Vote for some candidates
    console.log("--VOTING BEGINS--");
    await votingDapp.connect(voter1).vote(2);
    await votingDapp.connect(voter2).vote(3);
    await votingDapp.connect(voter3).vote(3);
    await votingDapp.connect(voter4).vote(2);
    await votingDapp.connect(voter5).vote(0);

    // Check votes
    candidates = await votingDapp.getCandidates();
    printCandidates(candidates);
    // console.log(candidates);

    const status = await votingDapp.getVotingStatus();
    // console.log(status);

    // Display result
    console.log("--RESULTS--");
    const winner = await votingDapp.getResults();
    // console.log(winner);
    printCandidates(winner);

}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})