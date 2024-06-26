import { ethers } from "ethers"
import { BaseContractAPI } from "./contracts/base-contract-api"

/**
 * NodeRefereeAPI is a class that provides an interface to interact with the HYCHAIN NodeReferee contract
 * @param contract NodeReferee contract instance
 */
export class HYCHAINNodeRefereeAPI extends BaseContractAPI {
  /// Status

  /**
   * Check if the node key has been revoked
   * @param tokenId Node key ID
   * @returns True if the node key is revoked, false otherwise
   */
  async isNodeKeyRevoked(tokenId: number): Promise<boolean> {
    return await this.contract.isNodeKeyRevoked(tokenId)
  }

  /// Claimable $TOPIA Rewards

  /**
   * Get the $TOPIA rewards for the given node key
   * @param tokenId Node key ID
   * @returns $TOPIA rewards that are claimable for given node key
   */
  async claimableNodeKeyRewards(tokenId: number): Promise<ethers.BigNumberish> {
    return await this.contract.maxRewardsToClaim(tokenId)
  }

  /**
   * Get the $TOPIA rewards for the given node keys
   * @param tokenIds Array of node key IDs
   * @returns $TOPIA rewards that are claimable for given node key
   */
  async claimableNodeKeyRewardsBatched(tokenIds: number[]): Promise<ethers.BigNumberish[]> {
    return await this.contract.maxRewardsToClaimBatched(tokenIds)
  }

  /// Claimed $TOPIA Rewards

  /**
   * Total $TOPIA rewards claimed by a given node key
   * @param tokenId Node key ID
   * @returns Total $TOPIA rewards claimed by a given node key
   */
  async claimedNodeKeyRewards(tokenId: number): Promise<ethers.BigNumberish> {
    return await this.contract.rewardClaimed(tokenId)
  }

  /**
   * Total $TOPIA rewards claimed for given node keys
   * @param tokenIds Array of node key IDs
   * @returns Total $TOPIA rewards claimed by all the provided node key IDs
   */
  async claimedNodeKeyRewardsBatched(tokenIds: number[]): Promise<ethers.BigNumberish[]> {
    return await this.contract.getRewardClaimedBatched(tokenIds)
  }

  /// $TOPIA Rewards

  /**
   * Total all-time $TOPIA rewards generated for across all node keys
   * @returns Total $TOPIA rewards
   */
  async totalRewardsDistributed(): Promise<ethers.BigNumberish> {
    return await this.contract.rewardDistributed()
  }

  /**
   * $TOPIA rewards generated for the node ecosystem per second
   * @returns $TOPIA rewards generated
   */
  async rewardsPerSecond(): Promise<ethers.BigNumberish> {
    return await this.contract.rewardPerSecond()
  }

  /// Assertions

  /**
   * Total number of assertions made by the node key
   * @param tokenId Node key ID
   * @returns Total number of assertions made by the node key
   */
  async totalNodeKeyAssertions(tokenId: number): Promise<ethers.BigNumberish> {
    return await this.contract.numAssertions(tokenId)
  }
}
