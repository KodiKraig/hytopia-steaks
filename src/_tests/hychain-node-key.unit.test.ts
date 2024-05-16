import { ethers } from "ethers"
import { HYCHAINNodeKeyAPI, OwnerTransferEvent, TransferEvent } from "../hychain-node-key"
import { MockProxy, mock } from "jest-mock-extended"

describe("HYCHAINNodeKeyAPI unit tests", () => {
  var contract: MockProxy<ethers.Contract>
  var api: HYCHAINNodeKeyAPI

  beforeEach(() => {
    contract = mock<ethers.Contract>()
    api = new HYCHAINNodeKeyAPI(contract)
  })

  describe("Node Owner Transfer Events", () => {
    it("should get transfer events without removed event and transferred after mint node", async () => {
      contract.queryFilter.mockResolvedValueOnce(EVENT_LOG as ethers.EventLog[])
      const owners = await api.getOwnersByEvents(100, 105)
      expect(contract.queryFilter).toHaveBeenCalledWith("Transfer", 100, 105)
      expect(owners).toEqual(OWNER_TRANSFER_EVENTS)
    })
  })
})

const EVENT_LOG = [
  {
    args: [
      "0x0000000000000000000000000000000000000000",
      "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
      1n,
    ],
    blockNumber: 100,
    blockHash: "0x00",
    transactionHash: "0x01",
    removed: false,
  },
  {
    args: [
      "0x0000000000000000000000000000000000000000",
      "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
      2n,
    ],
    blockNumber: 101,
    blockHash: "0x10",
    transactionHash: "0x11",
    removed: false,
  },
  {
    args: [
      "0x0000000000000000000000000000000000000000",
      "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
      3n,
    ],
    blockNumber: 102,
    blockHash: "0x20",
    transactionHash: "0x21",
    removed: false,
  },
  {
    args: [
      "0x0000000000000000000000000000000000000000",
      "0x6ca9658414D60945F63F2Edc9508dEbc5c0DB528",
      4n,
    ],
    blockNumber: 103,
    blockHash: "0x30",
    transactionHash: "0x31",
    removed: true,
  },
  {
    args: [
      "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
      "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
      2n,
    ],
    blockNumber: 103,
    blockHash: "0x40",
    transactionHash: "0x41",
    removed: false,
  },
  {
    args: [
      "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
      "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
      1n,
    ],
    blockNumber: 105,
    blockHash: "0x50",
    transactionHash: "0x51",
    removed: false,
  },
  {
    args: [
      "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
      "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
      1n,
    ],
    blockNumber: 103,
    blockHash: "0x60",
    transactionHash: "0x61",
    removed: false,
  },
]

const TRANSFER_EVENTS: TransferEvent[] = [
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    tokenId: 1,
    transactionHash: "0x01",
    removed: false,
    blockHash: "0x00",
    blockNumber: 100,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    tokenId: 2,
    transactionHash: "0x11",
    removed: false,
    blockHash: "0x10",
    blockNumber: 101,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
    tokenId: 3,
    transactionHash: "0x21",
    removed: false,
    blockHash: "0x20",
    blockNumber: 102,
  },
  {
    from: "0x0000000000000000000000000000000000000000",
    to: "0x6ca9658414D60945F63F2Edc9508dEbc5c0DB528",
    tokenId: 4,
    transactionHash: "0x31",
    removed: true,
    blockHash: "0x30",
    blockNumber: 103,
  },
  {
    from: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    to: "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
    tokenId: 2,
    transactionHash: "0x41",
    removed: false,
    blockHash: "0x40",
    blockNumber: 103,
  },
  {
    from: "0x4Ba336eEb966DA9b7cB7fFB7E89C03b4F550a827",
    to: "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
    tokenId: 1,
    transactionHash: "0x51",
    removed: false,
    blockHash: "0x50",
    blockNumber: 105,
  },
]

const OWNER_TRANSFER_EVENTS: OwnerTransferEvent[] = [
  {
    owner: "0x4F547d58BAdF981E1e98ECc90b3a18199dC7C305",
    tokenIds: [1, 2, 3],
    events: [TRANSFER_EVENTS[2], TRANSFER_EVENTS[4], TRANSFER_EVENTS[5]],
  },
]
