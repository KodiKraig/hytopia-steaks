import { ethers } from "ethers"
import { getNodeRefereeContract } from "../contracts"
import { NodeRefereeAPI } from "../node-referee"

describe("NodeRefereeAPI", () => {
  var api: NodeRefereeAPI

  beforeEach(() => {
    const provider = new ethers.JsonRpcProvider(process.env.HYCHAIN_JSON_RPC_URL)
    const contact = getNodeRefereeContract(provider)
    api = new NodeRefereeAPI(contact)
  })

  /// Claimable Rewards

  it("should check user rewards", async () => {
    const userRewards = await api.claimableNodeKeyRewards(process.env.TEST_NODE_ID_WITH_REWARDS)
    expect(Number(userRewards)).toBeGreaterThan(0)
  })

  it("should check batched claimable rewards", async () => {
    const batchedRewards = await api.claimableNodeKeyRewardsBatched([
      process.env.TEST_NODE_ID_WITH_REWARDS,
    ])
    expect(batchedRewards.length).toBe(1)
    expect(batchedRewards[0]).toBeGreaterThan(0)
  })

  /// Claimed Rewards

  it("should check claimed rewards", async () => {
    const claimedRewards = await api.claimedNodeKeyRewards(process.env.TEST_NODE_ID_WITH_REWARDS)
    expect(Number(claimedRewards)).toBeGreaterThan(0)
  })

  it("should check batched claimed rewards", async () => {
    const batchedRewards = await api.claimedNodeKeyRewardsBatched([
      process.env.TEST_NODE_ID_WITH_REWARDS,
    ])
    expect(batchedRewards.length).toBe(1)
    expect(batchedRewards[0]).toBeGreaterThan(0)
  })

  /// Rewards

  it("should check total all-time rewards", async () => {
    const totalRewards = await api.totalRewardsDistributed()
    expect(Number(totalRewards)).toBeGreaterThan(200000)
  })

  it("should check rewards per second", async () => {
    const rewardsPerSecond = await api.rewardsPerSecond()
    expect(Number(rewardsPerSecond)).toBeGreaterThan(0)
  })

  /// Assertions

  it("should check total assertions", async () => {
    const totalAssertions = await api.totalNodeKeyAssertions(process.env.TEST_NODE_ID_WITH_REWARDS)
    expect(Number(totalAssertions)).toBeGreaterThan(0)
  })

  /// Status

  it("should check if node key is revoked", async () => {
    const isRevoked = await api.isNodeKeyRevoked(process.env.TEST_NODE_ID_WITH_REWARDS)
    expect(isRevoked).toBe(false)
  })
})
