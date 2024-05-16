import { Contract, Provider } from "ethers"
import nodeReferee from "./json/node-referee-contract.json"

export const getHYCHAINNodeRefereeContract = (provider: Provider): Contract => {
  return new Contract(nodeReferee.contract.address, nodeReferee.contract.abi, provider)
}
