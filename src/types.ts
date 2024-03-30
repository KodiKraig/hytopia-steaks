import { ethers } from "ethers"

export interface WorldInfo {
  // weight based on rarity
  weight: ethers.BigNumberish

  // staked to, otherwise owner == 0
  owner: string

  // unit is ether, paid in WRLD. The deposit is deducted from the last payment(s) since the deposit is non-custodial
  deposit: ethers.BigNumberish

  // unit is ether, paid in WRLD. Total is deposit + rentalPerDay * days
  rentalPerDay: ethers.BigNumberish

  // must rent for at least min rent days, otherwise deposit is forfeited up to this amount
  minRentDays: ethers.BigNumberish

  // timestamp in unix epoch
  rentableUntil: ethers.BigNumberish
}

export interface WorldStakeEvent {
  // ID of the NFT
  tokenId: ethers.BigNumberish

  // Owner of the NFT
  owner: string

  // Block number of the event
  blockNumber: ethers.BigNumberish

  // Hash of the block
  blockHash: string

  // Hash of the transaction
  transactionHash: string

  // True if the event was removed
  removed: boolean
}
