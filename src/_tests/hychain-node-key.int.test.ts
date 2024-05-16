import { ethers } from "ethers"
import { HYCHAINNodeKeyAPI, OwnerTransferEvent, TransferEvent } from "../hychain-node-key"
import { getHYCHAINNodeNFTContract } from "../contracts/hychain-node-key-contract"
import { TEST_NODE_ID_WITH_REWARDS, TEST_NODE_KEY_OWNER_ADDRESS } from "./constants"

const NODE_KEY_ID = TEST_NODE_ID_WITH_REWARDS

describe("HYCHAINNodeKeyAPI", () => {
  var api: HYCHAINNodeKeyAPI

  beforeEach(() => {
    const provider = new ethers.JsonRpcProvider(process.env.HYCHAIN_JSON_RPC_URL)
    const contract = getHYCHAINNodeNFTContract(provider)
    api = new HYCHAINNodeKeyAPI(contract)
  })

  it("should get the balance of the owner", async () => {
    const balance = await api.balanceOf(TEST_NODE_KEY_OWNER_ADDRESS)
    expect(balance).toEqual(3)
  })

  it("should get the owner of the node key", async () => {
    const owner = await api.getNodeKeyOwner(NODE_KEY_ID)
    expect(owner).toEqual(TEST_NODE_KEY_OWNER_ADDRESS)
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

  it("should get transfer events", async () => {
    const events = await api.getTransferEvents(300946, 337041)
    expect(events).toEqual(TRANSFER_EVENTS)
  })

  it("should get the node key owners by transfer events", async () => {
    const owners = await api.getOwnersByEvents(300946, 337041)
    expect(owners).toEqual(OWNER_TRANSFER_EVENTS)
  })
})

const TRANSFER_EVENTS: TransferEvent[] = [
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    tokenId: 17370,
    transactionHash: "0xc953a5a53c61efda561da859eafce857d56706b62cfd0ba130e39d106dfe026e",
    removed: false,
    blockHash: "0x7e9bfbe4e87a8827be44d1a9f4060d99da300f00da113c50575e7c1e8b49e085",
    blockNumber: 300946,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    tokenId: 17371,
    transactionHash: "0xc953a5a53c61efda561da859eafce857d56706b62cfd0ba130e39d106dfe026e",
    removed: false,
    blockHash: "0x7e9bfbe4e87a8827be44d1a9f4060d99da300f00da113c50575e7c1e8b49e085",
    blockNumber: 300946,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
    tokenId: 17372,
    transactionHash: "0x84cf19de5c9071ec585ae3affa13347f3f51d4b1d073addb7def2458a745d299",
    removed: false,
    blockHash: "0xb7c1454d2db385ba76cbf05aa9f4778dbed3cd83671c76a6ff82d28e32c0c04b",
    blockNumber: 312419,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x6ca9658414D60945F63F2Edc9508dEbc5c0DB528",
    tokenId: 17373,
    transactionHash: "0xbd5f62d9f572421229bb6b6cab45f49b07c6d9ab300e9ffc320c9a82585f2235",
    removed: false,
    blockHash: "0xe0e33bb52439eed36592b8bb4d01a9e757df870994d014ce41d49eae65a96103",
    blockNumber: 334249,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0xdfAd74D7E7EdbBe2776483B17D570437D5EBD48e",
    tokenId: 17374,
    transactionHash: "0x3c3ebad71ea0a718fcd4db3f4b0855b3ce83d99c59b26713cff158ae716c191e",
    removed: false,
    blockHash: "0x28a515323df23c25d269b367bc6ac7f8d87b5a9a1b2005a709a9ee923b9eb225",
    blockNumber: 337041,
  },
]

const OWNER_TRANSFER_EVENTS: OwnerTransferEvent[] = [
  {
    owner: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    tokenIds: [17370, 17371],
    events: [TRANSFER_EVENTS[0], TRANSFER_EVENTS[1]],
  },
  {
    owner: "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
    tokenIds: [17372],
    events: [TRANSFER_EVENTS[2]],
  },
  {
    owner: "0x6ca9658414D60945F63F2Edc9508dEbc5c0DB528",
    tokenIds: [17373],
    events: [TRANSFER_EVENTS[3]],
  },
  {
    owner: "0xdfAd74D7E7EdbBe2776483B17D570437D5EBD48e",
    tokenIds: [17374],
    events: [TRANSFER_EVENTS[4]],
  },
]
