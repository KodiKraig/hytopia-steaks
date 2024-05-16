import { ethers } from "ethers"
import { getHYCHAINNodeRefereeContract } from "../contracts/hychain-node-referee-contract"
import { HYCHAINNodeRefereeAPI } from "../hychain-node-referee"

const NODE_KEY_ID = Number(process.env.TEST_NODE_ID_WITH_REWARDS)

describe("NodeRefereeAPI", () => {
  var api: HYCHAINNodeRefereeAPI

  beforeEach(() => {
    const provider = new ethers.JsonRpcProvider(process.env.HYCHAIN_JSON_RPC_URL)
    const contact = getHYCHAINNodeRefereeContract(provider)
    api = new HYCHAINNodeRefereeAPI(contact)
  })

  /// Claimable Rewards

  it("should check user rewards", async () => {
    const userRewards = await api.claimableNodeKeyRewards(NODE_KEY_ID)
    expect(Number(userRewards)).toBeGreaterThan(0)
  })

  it("should check batched claimable rewards", async () => {
    const batchedRewards = await api.claimableNodeKeyRewardsBatched([NODE_KEY_ID])
    expect(batchedRewards.length).toBe(1)
    expect(batchedRewards[0]).toBeGreaterThan(0)
  })

  /// Claimed Rewards

  it("should check claimed rewards", async () => {
    const claimedRewards = await api.claimedNodeKeyRewards(NODE_KEY_ID)
    expect(Number(claimedRewards)).toBeGreaterThan(0)
  })

  it("should check batched claimed rewards", async () => {
    const batchedRewards = await api.claimedNodeKeyRewardsBatched([NODE_KEY_ID])
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
    const totalAssertions = await api.totalNodeKeyAssertions(NODE_KEY_ID)
    expect(Number(totalAssertions)).toBeGreaterThan(0)
  })

  /// Status

  it("should check if node key is revoked", async () => {
    const isRevoked = await api.isNodeKeyRevoked(NODE_KEY_ID)
    expect(isRevoked).toBe(false)
  })
})
