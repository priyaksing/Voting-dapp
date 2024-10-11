"use client"
import React, { useState, useEffect } from "react";
import CandidateList from "./components/CandidateList"
import VotingForm from "./components/VotingForm"
import ResultDisplay from "./components/ResultDisplay"
import abi from "/context/Voting.json";
import Image from "next/image";
import { ethers } from "ethers";

export default function Home() {

  // Contract address of the deployed smart contract
  const contractAddress = "0x70f41A6A442CFAAbE65BB8230762D2d19736Aef3";
  const ABI = abi.abi;

  const [currentAccount, setCurrentAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState([]);
  const [index, setIndex] = useState('');
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  /**
   * @dev Handle input change of candidate index
   */
  const onIndexChange = (e) => {
    setIndex(e.target.value);
  }


  /**
   * @dev Check if metamask is installed.
   * If installed, connects to the Metamask account and sets the current account.
   */
  const connectWallet = async () => {
    try {

      const { ethereum } = window;
      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        setCurrentAccount(account[0]);
      }
      else {
        console.log("Please install Metamask");
      }

    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Creates an instance of the smart contract using contract address, ABI and signer.
   * Using the instance, calls getCandidates() method in the contract to retrieve the list of candidates and formats them.
   * Sets variable 'candidates' with retrieved list.
   */
  const getCandidates = async () => {
    try {

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const signer = await provider.getSigner();
        const votingDapp = new ethers.Contract(contractAddress, ABI, signer);

        const candidateList = await votingDapp.getCandidates();
        // await candidateList.wait();

        const formattedList = candidateList.map((candidate, index) => {
          return {
            index: index,
            name: candidate.name,
            votes: Number(candidate.votingCount)
          }
        });

        setCandidates(formattedList);

      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Creates an instance of the smart contract using contract address, ABI and signer.
   * Calls vote() in the contract with the index of the candidate as parameter. 
   * Invokes votingStatus() to retrieve the voting status of voter
   */
  const voteCandidate = async () => {
    try {

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const signer = await provider.getSigner();
        const votingDapp = new ethers.Contract(contractAddress, ABI, signer);

        const voteTxn = await votingDapp.vote(index);
        await voteTxn.wait();
        console.log("Voted", voteTxn.hash);
        votingStatus();
        alert(`Voted successfully! : ${voteTxn.hash}`);
      }
    } catch (error) {
      console.log(error.reason);
    }
  }


  /**
   * Calls method getVotingStatus() in the contract to retrieve the signer's voting status and set the variable 'alreadyVoted' accordingly.
   */
  const votingStatus = async () => {
    try {

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const signer = await provider.getSigner();
        const votingDapp = new ethers.Contract(contractAddress, ABI, signer);

        const voteStatus = await votingDapp.getVotingStatus();
        setAlreadyVoted(voteStatus);
      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Calls the getResults() method in the contract to retrieve the winner and formats them.
   * Filters out the result to remove empty values.
   * Sets the 'winner' variable
   */
  const getResults = async () => {
    try {

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(ethereum, "any");
        const signer = await provider.getSigner();
        const votingDapp = new ethers.Contract(contractAddress, ABI, signer);

        const results = await votingDapp.getResults();
        // await results.wait();
        let formattedResults = results.map((candidate) => {
          return {
            name: candidate.name,
            votes: Number(candidate.votingCount)
          }
        })

        formattedResults = formattedResults.filter((result) => {
          return result.name != '';
        })

        setWinner(formattedResults);

      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Invokes the below functions on the first render and everytime 'winner' and 'alreadyVoted' are updated.
   */
  useEffect(() => {

    getCandidates();
    votingStatus();
    getResults();

  }, [winner, alreadyVoted]);


  /**
   * If current account is set, then display the form and result.
   * Else, display the connect wallet button.
   */
  return (
    <div className="text-white flex flex-col items-center justify-center py-8 gap-y-5">
      <h1 className="flex justify-center items-center w-full text-2xl tracking-widest font-semibold m-5 pt-2">
        WELCOME TO THE DECENTRALIZED VOTING APP
      </h1>

      {currentAccount ? (
        <div className="flex flex-col w-full justify-center items-center gap-y-5 pb-5">
          <VotingForm
            candidates={candidates}
            index={index}
            onIndexChange={onIndexChange}
            voteCandidate={voteCandidate}
            alreadyVoted={alreadyVoted}
          />

          <CandidateList
            candidates={candidates}
          />

          <ResultDisplay
            winner={winner}
          />
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className='text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5'>
          Connect Wallet
        </button>
      )}

    </div>
  )
}
