// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Voting {
    // Candidate data
    struct Candidate {
        string name;
        uint256 votingCount;
    }

    // Array of struct to store candidates
    Candidate[] public candidates;

    // Mapping to track voting status of voters
    mapping(address => bool) public alreadyVoted;

    constructor(string[] memory _candidates) {
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(Candidate({name: _candidates[i], votingCount: 0}));
        }
    }

    /**
     * @dev method to vote for a candidate using their index
     */
    function vote(uint256 _candidateIndex) public {
        require(!alreadyVoted[msg.sender], "You have already voted!");
        require(
            _candidateIndex < candidates.length,
            "Please select a valid candidate index"
        );

        candidates[_candidateIndex].votingCount++;
        alreadyVoted[msg.sender] = true;
    }

    /**
     * @dev method to retrieve all the candidates
     */
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    /**
     * @dev method to retrieve the voting status of a voter
     */
    function getVotingStatus() public view returns (bool) {
        return alreadyVoted[msg.sender];
    }

    /**
     * @dev method to assign and return the winner(s)
     */
    function getResults() public view returns (Candidate[] memory) {
        uint256 max = candidates[0].votingCount;
        uint256 ind = 0;
        Candidate[] memory winner = new Candidate[](candidates.length);

        for (uint256 i = 1; i < candidates.length; i++) {
            if (candidates[i].votingCount > max) {
                max = candidates[i].votingCount;
            }
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].votingCount == max) {
                winner[ind] = candidates[i];
                ind++;
            }
        }

        return winner;
    }
}
