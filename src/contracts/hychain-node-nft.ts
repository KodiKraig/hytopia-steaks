import { Contract, Provider } from "ethers"
import nodeNFT from "./json/hychain-node-key-contract.json"

export const getHYCHAINNodeNFTContract = (provider: Provider): Contract => {
  return new Contract(nodeNFT.contract.address, nodeNFT.contract.abi, provider)
}
