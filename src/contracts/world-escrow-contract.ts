import { Contract, Provider } from "ethers"
import worldEscrow from "./json/world-escrow-contract.json"

export const getWorldEscrowContract = (provider: Provider): Contract => {
  return new Contract(worldEscrow.contract.address, worldEscrow.contract.abi, provider)
}
