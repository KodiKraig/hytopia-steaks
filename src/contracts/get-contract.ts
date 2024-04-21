import { ethers } from "ethers"
import nodeReferee from "./json/node-referee-contract.json"
import worldEscrow from "./json/world-escrow-contract.json"
import nodeNFT from "./json/hychain-node-key-contract.json"

export const getWorldEscrowContract = (provider: ethers.Provider): ethers.Contract => {
  return new ethers.Contract(worldEscrow.contract.address, worldEscrow.contract.abi, provider)
}

export const getHYCHAINNodeRefereeContract = (provider: ethers.Provider): ethers.Contract => {
  return new ethers.Contract(nodeReferee.contract.address, nodeReferee.contract.abi, provider)
}

export const getHYCHAINNodeNFTContract = (provider: ethers.Provider): ethers.Contract => {
  return new ethers.Contract(nodeNFT.contract.address, nodeNFT.contract.abi, provider)
}
