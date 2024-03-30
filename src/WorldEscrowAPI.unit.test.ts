import { WorldEscrowAPI } from "./WorldEscrowAPI"
import { mock, MockProxy } from "jest-mock-extended"
import { ethers, Result } from "ethers"
import { WorldInfo } from "./types"

describe("WorldEscrowAPI unit tests", () => {
  var contract: MockProxy<ethers.Contract>
  var worldEscrowAPI: WorldEscrowAPI

  beforeEach(() => {
    contract = mock<ethers.Contract>()
    worldEscrowAPI = new WorldEscrowAPI(contract)
  })

  /// World Info

  it("should get world info", async () => {
    const expected: WorldInfo = {
      weight: 100,
      owner: "0x1234",
      deposit: 200,
      rentalPerDay: 10,
      minRentDays: 5,
      rentableUntil: 1000000,
    }

    contract.getWorldInfo.mockResolvedValueOnce(expected)

    const worldInfo = await worldEscrowAPI.getWorldInfo(999)

    expect(worldInfo).toEqual(expected)
    expect(contract.getWorldInfo).toHaveBeenCalledWith(999)
  })

  it("should empty get world info", async () => {
    contract.getWorldInfo.mockResolvedValueOnce({})

    const worldInfo = await worldEscrowAPI.getWorldInfo(999)

    expect(worldInfo).toEqual({})
    expect(contract.getWorldInfo).toHaveBeenCalledWith(999)
  })

  /// User Rewards

  it("should check user rewards", async () => {
    contract.checkUserRewards.mockResolvedValueOnce("9213193929392922")

    const userRewards = await worldEscrowAPI.checkUserRewards("0x1234")

    expect(userRewards).toEqual(ethers.formatEther("9213193929392922"))
    expect(contract.checkUserRewards).toHaveBeenCalledWith("0x1234")
  })

  /// User Staked Tokens

  it("should get user staked tokens", async () => {
    contract.userStakedWorlds.mockResolvedValueOnce(["1", "2", "3"])

    const stakedTokens = await worldEscrowAPI.getUserStakedTokens("0x1234")

    expect(stakedTokens).toEqual([1, 2, 3])
    expect(contract.userStakedWorlds).toHaveBeenCalledWith("0x1234")
  })

  /// Get Stake Events

  it("should get staked events", async () => {
    contract.queryFilter.mockResolvedValueOnce([EVENT_LOG as ethers.EventLog])

    const tokens = await worldEscrowAPI.getStakedEvents(100, 200)

    expect(tokens).toEqual([STAKE_EVENT])
    expect(contract.queryFilter).toHaveBeenCalledWith("WorldStaked", 100, 200)
  })

  it("should get empty stake events", async () => {
    contract.queryFilter.mockResolvedValueOnce([])

    const tokens = await worldEscrowAPI.getStakedEvents(100, 200)

    expect(tokens).toEqual([])
    expect(contract.queryFilter).toHaveBeenCalledWith("WorldStaked", 100, 200)
  })

  /// Get Unstake Events

  it("should get unstake events", async () => {
    contract.queryFilter.mockResolvedValueOnce([EVENT_LOG as ethers.EventLog])

    const tokens = await worldEscrowAPI.getUnstakedEvents(100, 200)

    expect(tokens).toEqual([STAKE_EVENT])
    expect(contract.queryFilter).toHaveBeenCalledWith("WorldUnstaked", 100, 200)
  })

  it("should get empty unstake events", async () => {
    contract.queryFilter.mockResolvedValueOnce([])

    const tokens = await worldEscrowAPI.getUnstakedEvents(100, 200)

    expect(tokens).toEqual([])
    expect(contract.queryFilter).toHaveBeenCalledWith("WorldUnstaked", 100, 200)
  })

  /// Get All Staked Tokens By Events

  it("should get all staked tokens by events", async () => {
    contract.queryFilter.mockResolvedValueOnce(STAKE_EVENTS_LOG as ethers.EventLog[])
    contract.queryFilter.mockResolvedValueOnce(UNSTAKE_EVENTS_LOG as ethers.EventLog[])

    const tokens = await worldEscrowAPI.getAllStakedTokensByEvents(100, 600)

    expect(tokens).toEqual(RECONCILED_STAKED_EVENTS)
    expect(contract.queryFilter).toHaveBeenCalledWith("WorldStaked", 100, 600)
    expect(contract.queryFilter).toHaveBeenCalledWith("WorldUnstaked", 100, 600)
  })
})

const EVENT_LOG = {
  args: new Result(2287n, "0xE07"),
  blockNumber: 100,
  blockHash: "0x1235",
  transactionHash: "0x1236",
  removed: false,
}

const STAKE_EVENT = {
  tokenId: 2287,
  owner: "0xE07",
  blockNumber: 100,
  blockHash: "0x1235",
  transactionHash: "0x1236",
  removed: false,
}

const UNSTAKE_EVENTS_LOG = [
  {
    args: new Result(2000n, "0xE07"),
    blockNumber: 100,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
  {
    args: new Result(3000n, "0xE08"),
    blockNumber: 200,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
]

const STAKE_EVENTS_LOG = [
  {
    args: new Result(2000n, "0xE07"),
    blockNumber: 99,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
  {
    args: new Result(3000n, "0xE08"),
    blockNumber: 500,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
  {
    args: new Result(4000n, "0xE09"),
    blockNumber: 501,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
]

const RECONCILED_STAKED_EVENTS = [
  {
    tokenId: 3000,
    owner: "0xE08",
    blockNumber: 500,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
  {
    tokenId: 4000,
    owner: "0xE09",
    blockNumber: 501,
    blockHash: "0x1235",
    transactionHash: "0x1236",
    removed: false,
  },
]
