import { ethers } from "ethers"
import { HYCHAINNodeKeyAPI } from "../hychain-node-key"
import { getHYCHAINNodeNFTContract } from "../contracts"

const NODE_KEY_ID = Number(process.env.TEST_NODE_ID_WITH_REWARDS)

describe("HYCHAINNodeKeyAPI", () => {
  var api: HYCHAINNodeKeyAPI

  beforeEach(() => {
    const provider = new ethers.JsonRpcProvider(process.env.HYCHAIN_JSON_RPC_URL)
    const contract = getHYCHAINNodeNFTContract(provider)
    api = new HYCHAINNodeKeyAPI(contract)
  })

  it("should get the balance of the owner", async () => {
    const balance = await api.balanceOf(process.env.TEST_NODE_KEY_OWNER_ADDRESS)
    expect(balance).toEqual(3)
  })

  it("should get the owner of the node key", async () => {
    const owner = await api.getNodeKeyOwner(NODE_KEY_ID)
    expect(owner).toEqual(process.env.TEST_NODE_KEY_OWNER_ADDRESS)
  })

  it("should get the name of the token", async () => {
    const name = await api.getName()
    expect(name).toEqual("HychainNodeKey")
  })

  it("should get the symbol of the token", async () => {
    const symbol = await api.getTokenSymbol()
    expect(symbol).toEqual("HYNK")
  })

  it("should get the token URI of the token", async () => {
    const tokenURI = await api.getTokenURI(1)
    expect(tokenURI).toEqual("") // Empty for now until they update the contract
  })

  it("should get the total supply of the token", async () => {
    const totalSupply = await api.getTotalSupply()
    expect(totalSupply).toBeGreaterThan(17290)
    expect(totalSupply).toBeLessThanOrEqual(50000)
  })
})
