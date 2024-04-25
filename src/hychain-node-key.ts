import { BlockTag, ethers } from "ethers"

/**
 * API for interacting with the HYCHAIN Node Key L2 contract
 */
export class HYCHAINNodeKeyAPI {
  private hychainNodeKey: ethers.Contract

  constructor(contract: ethers.Contract) {
    this.hychainNodeKey = contract
  }

  /**
   * Get the current token balance of the owner
   * @param owner Owner address of the tokens
   * @returns Current token balance of the owner
   */
  async balanceOf(owner: string): Promise<number> {
    const count = await this.hychainNodeKey.balanceOf(owner)
    return Number(count)
  }

  /**
   * Get the name of the token
   * @returns Name of the token
   */
  async getName(): Promise<string> {
    return this.hychainNodeKey.name()
  }

  /**
   * Get the owner of the node key
   * @param tokenId Node key ID
   * @returns Owner of the node key
   */
  async getNodeKeyOwner(tokenId: number): Promise<string> {
    return await this.hychainNodeKey.ownerOf(tokenId)
  }

  /**
   * Get the symbol of the token
   * @returns Symbol of the token
   */
  async getTokenSymbol(): Promise<string> {
    return this.hychainNodeKey.symbol()
  }

  /**
   * Get the tokenURI of the token
   * @param tokenId Node key ID
   * @returns TokenURI of the token
   */
  async getTokenURI(tokenId: number): Promise<string> {
    return this.hychainNodeKey.tokenURI(tokenId)
  }

  /**
   * Get the current total supply of the token
   * @returns Current total supply of the token
   */
  async getTotalSupply(): Promise<number> {
    const count = await this.hychainNodeKey.totalSupply()
    return Number(count)
  }

  /**
   * All the current node key owners with their related transfer events
   * @param fromBlock starting block number
   * @param toBlock ending block number
   * @returns Node key owners with their related transfer events
   */
  async getNodeKeyOwnersByEvents(
    fromBlock?: BlockTag,
    toBlock?: BlockTag,
  ): Promise<OwnerTransferEvent[]> {
    const events = await this.getTransferEvents(fromBlock, toBlock)

    let ownerEvents: OwnerTransferEvent[] = []

    for (const event of events) {
      const ownerEvent = ownerEvents.find((ownerEvent) => ownerEvent.owner === event.to)
      if (ownerEvent) {
        ownerEvent.tokenIds.push(event.tokenId)
        ownerEvent.events.push(event)
      } else {
        ownerEvents.push({
          owner: event.to,
          tokenIds: [event.tokenId],
          events: [event],
        })
      }
    }

    return ownerEvents
  }

  /**
   * Get all TransferEvents within the given block range
   * @param fromBlock starting block number
   * @param toBlock ending block number
   * @returns all TransferEvents within the given block range
   */
  async getTransferEvents(fromBlock?: BlockTag, toBlock?: BlockTag): Promise<TransferEvent[]> {
    const events = await this.hychainNodeKey.queryFilter("Transfer", fromBlock, toBlock)
    return events
      .map((event) => event as ethers.EventLog)
      .map((event) => {
        return {
          from: `${event.args[0]}`,
          to: `${event.args[1]}`,
          tokenId: Number(event.args[2]),
          transactionHash: event.transactionHash,
          removed: event.removed,
          blockHash: event.blockHash,
          blockNumber: event.blockNumber,
        } as TransferEvent
      })
  }
}

export interface TransferEvent {
  // Address of the sender
  from: string

  // Address of the receiver
  to: string

  // Token ID
  tokenId: number

  // Block number of the event
  blockNumber: ethers.BigNumberish

  // Hash of the block
  blockHash: string

  // Hash of the transaction
  transactionHash: string

  // True if the event was removed
  removed: boolean
}

export interface OwnerTransferEvent {
  // Address of the owner
  owner: string

  // All tokens owned by the owner
  tokenIds: number[]

  // Events used to derive the owner and token IDs
  events: TransferEvent[]
}
