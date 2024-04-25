import { ethers } from "ethers"

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
}
