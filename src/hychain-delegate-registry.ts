import { BaseContractAPI } from "./contracts/base-contract-api"

export class HYCHAINDelegateRegistryAPI extends BaseContractAPI {
  /// Outgoing

  /**
   * Get all outgoing delegations for a given address
   * @param from address of the delegator
   * @returns Delegations for the given address
   */
  async getOutgoingDelegations(from: string): Promise<Delegation[]> {
    const response: any[] = await this.contract.getOutgoingDelegations(from)

    if (response && response.length > 0) {
      return response.map((delegation) => {
        return {
          delegationType: DelegationTypes[Number(delegation[0])],
          to: delegation[1],
          from: delegation[2],
          rights: delegation[3],
          contract: delegation[4],
          tokenId: delegation[5],
          amount: delegation[6],
        }
      })
    }

    return []
  }
}

/// @notice Delegation type, NONE is used when a delegation does not exist or is revoked
export type DelegationType = "NONE" | "ALL" | "CONTRACT" | "ERC721" | "ERC20" | "ERC1155"

export const DelegationTypes = Object.freeze({
  0: "NONE",
  1: "ALL",
  2: "CONTRACT",
  3: "ERC721",
  4: "ERC20",
  5: "ERC1155",
})

/// @notice Struct for returning delegations
export interface Delegation {
  delegationType: DelegationType
  to: string
  from: string
  rights: string
  contract: string
  tokenId: bigint
  amount: bigint
}
