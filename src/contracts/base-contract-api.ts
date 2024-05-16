import { Contract } from "ethers"

export class BaseContractAPI {
  readonly contract: Contract

  constructor(contract: Contract) {
    this.contract = contract
  }
}
