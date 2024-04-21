import { ethers } from "ethers"
import nodeReferee from "./node-referee-contract.json"
import worldEscrow from "./world-escrow-contract.json"

export const getWorldEscrowContract = (provider: ethers.Provider): ethers.Contract => {
  return new ethers.Contract(worldEscrow.contract.address, worldEscrow.contract.abi, provider)
}

export const getNodeRefereeContract = (provider: ethers.Provider): ethers.Contract => {
  return new ethers.Contract(nodeReferee.contract.address, nodeReferee.contract.abi, provider)
}
