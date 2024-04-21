import { BlockTag, ethers } from "ethers"

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

/**
 * World Escrow wrapper API for interacting with the World Escrow contract via ethers.js
 * @param contract WorldEscrow contract instance
 */
export class WorldEscrowAPI {
  private worldsEscrow: ethers.Contract

  constructor(contract: ethers.Contract) {
    this.worldsEscrow = contract
  }

  /// World Info

  /**
   * Get the World Info for the given token ID
   * @param tokenId NFT token ID
   * @returns WorldInfo representing the given token ID
   */
  async getWorldInfo(tokenId: number): Promise<WorldInfo> {
    return this.worldsEscrow.getWorldInfo(tokenId)
  }

  /// User

  /**
   * Get the $TOPIA rewards for the given address
   * @param user address of the user
   * @returns $TOPIA rewards that are claimable for given address
   */
  async checkUserRewards(user: string): Promise<ethers.BigNumberish> {
    const rewards = await this.worldsEscrow.checkUserRewards(user)
    return ethers.formatEther(rewards)
  }

  /**
   * Get all the staked tokens for the given user
   * @param user address of the user
   * @returns Array of staked tokens for the given user
   */
  async getUserStakedTokens(user: string): Promise<number[]> {
    const result = await this.worldsEscrow.userStakedWorlds(user)
    return result.map((tokenId: string) => Number(tokenId))
  }

  /// Stake Events

  /**
   * Get all staked tokens events with the given block range reconciling them against unstaked events.
   *
   * NOTE: Uses the events to determine the staked tokens which uses the least API calls.
   * In order to ensure that all staked tokens are current then you need to start from the first block of the contract to latest.
   *
   * @param fromBlock starting block number. Default is genesis block
   * @param toBlock ending block number. Default is latest block
   * @returns Array of WorldStakeEvent representing all staked tokens
   */
  async getAllStakedTokensByEvents(
    fromBlock?: BlockTag,
    toBlock?: BlockTag,
  ): Promise<WorldStakeEvent[]> {
    const stakedEvents = await this.getStakedEvents(fromBlock, toBlock)
    const unstakeEvents = await this.getUnstakedEvents(fromBlock, toBlock)

    return stakedEvents.filter((stakedEvent) => {
      return !unstakeEvents.some(
        (unstakeEvent) =>
          unstakeEvent.tokenId === stakedEvent.tokenId &&
          unstakeEvent.blockNumber > stakedEvent.blockNumber,
      )
    })
  }

  /**
   * Get the stake events within the given block range
   * @param fromBlock starting block number. Default is genesis block
   * @param toBlock ending block number. Default is latest block
   * @returns World Stake Events within the given block range
   */
  async getStakedEvents(fromBlock?: BlockTag, toBlock?: BlockTag): Promise<WorldStakeEvent[]> {
    return await this.getWorldStakeEvent("WorldStaked", fromBlock, toBlock)
  }

  /**
   * Get the unstake events within the given block range
   * @param fromBlock starting block number. Default is genesis block
   * @param toBlock ending block number. Default is latest block
   * @returns World Stake Events within the given block range
   */
  async getUnstakedEvents(fromBlock?: BlockTag, toBlock?: BlockTag): Promise<WorldStakeEvent[]> {
    return await this.getWorldStakeEvent("WorldUnstaked", fromBlock, toBlock)
  }

  private async getWorldStakeEvent(
    event: string,
    fromBlock?: BlockTag,
    toBlock?: BlockTag,
  ): Promise<WorldStakeEvent[]> {
    const events = await this.worldsEscrow.queryFilter(event, fromBlock, toBlock)
    return events
      .map((event) => event as ethers.EventLog)
      .map((event) => {
        return {
          tokenId: Number(event.args[0]),
          owner: `${event.args[1]}`,
          transactionHash: event.transactionHash,
          removed: event.removed,
          blockHash: event.blockHash,
          blockNumber: event.blockNumber,
        } as WorldStakeEvent
      })
  }
}
