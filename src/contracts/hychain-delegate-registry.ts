import { Contract, Provider } from "ethers"
import delegateRegistry from "./json/hychain-delegate-registry-contract.json"

export const getHYCHAINDelegateRegistryContract = (provider: Provider): Contract => {
  return new Contract(delegateRegistry.contract.address, delegateRegistry.contract.abi, provider)
}
