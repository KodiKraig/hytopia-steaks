import { ethers } from "ethers"
import { getHYCHAINDelegateRegistryContract } from "../contracts/hychain-delegate-registry-contract"
import { HYCHAINDelegateRegistryAPI } from "../hychain-delegate-registry"

const DELEGATION_OUTGOING = process.env.TEST_DELEGATE_REGISTRY_ADDRESS_WITH_OUTGOING!
const NO_DELEGATION = process.env.TEST_DELEGATE_REGISTRY_ADDRESS_NO_DELEGATIONS!

describe("HYCHAIN Delegate Registry", () => {
  var api: HYCHAINDelegateRegistryAPI

  beforeEach(() => {
    const provider = new ethers.JsonRpcProvider(process.env.HYCHAIN_JSON_RPC_URL)
    const contact = getHYCHAINDelegateRegistryContract(provider)
    api = new HYCHAINDelegateRegistryAPI(contact)
  })

  test("Should have delegation for node keys", async () => {
    const response = await api.getOutgoingDelegations(DELEGATION_OUTGOING)

    expect(response.length).toBeGreaterThan(0)

    expect(response[0].delegationType).toEqual("CONTRACT")
    expect(response[0].to).toEqual("0xE34b67C9e8ef5D7cC6EF91cf01aE78F2fA55c2A8")
    expect(response[0].from).toEqual("0x992a977Db9E7884AF277f62Ea292028808763DaD")
    expect(response[0].rights).toEqual(
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    )
    expect(response[0].contract).toEqual("0xE1060b30D9fF01Eef71248906Ce802801a670A48")
    expect(response[0].tokenId).toEqual(0n)
    expect(response[0].amount).toEqual(0n)
  })

  test("Should have no delegation", async () => {
    const response = await api.getOutgoingDelegations(NO_DELEGATION)
    expect(response.length).toBe(0)
  })
})
