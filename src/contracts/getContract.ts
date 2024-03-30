import { ethers } from "ethers"
import hytopia from "./hytopia-contracts.json"

export const getWorldEscrowContract = (provider: ethers.Provider): ethers.Contract => {
  return new ethers.Contract(
    hytopia.contracts.worldsEscrow.address,
    hytopia.contracts.worldsEscrow.abi,
    provider,
  )
}
