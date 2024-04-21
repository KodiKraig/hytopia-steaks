<h1 align="center">🥩 HYTOPIA Staking Contract Analyzer 🥩</h1>

<p align="center">
  <img src="https://pbs.twimg.com/profile_images/1683869553238106112/a315BhPh_400x400.jpg" alt="Your image description" width="150" height="150">
</p>


<div align="center">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/hytopia-steaks">
    <a href="https://codecov.io/gh/KodiKraig/hytopia-steaks" > 
        <img src="https://codecov.io/gh/KodiKraig/hytopia-steaks/graph/badge.svg?token=QOE1CZRH3X"/> 
    </a>
</div>

<br>

<p align="center">
  <strong>A wrapper library for <a href="https://hytopia.com/">HYTOPIA</a> and <a href="https://explorer.hychain.com/">HYCHAIN</a> contracts with helper functions to help calculate staking status rewards across the various assets within the ecosystem.</strong>
</p>

<p align="center">
  <em>This is a community repository. Not directly affiliated with HYTOPIA.</em>
</p>

<br>

## Dependencies

[ethers.js v6](https://github.com/ethers-io/ethers.js)

## Getting Started

Install the library

`npm install hytopia-steaks`

## Roadmap

- [x] [Worlds Staking Contract](https://etherscan.io/address/0x2f53e033c55eb6c87cea259123c0a68ca3578426)
- [x] [HYCHAIN Node Referee Contract](https://explorer.hychain.com/address/0x6c065572f1824171186aF6dF848313784d6E5b0E)
- [x] [HYCHAIN Node NFT Contract](https://explorer.hychain.com/address/0xE1060b30D9fF01Eef71248906Ce802801a670A48?)
- [ ] [Worlds NFT Contract](https://etherscan.io/token/0x8d9710f0e193d3f95c0723eaaf1a81030dc9116d)
- [ ] Avatar Staking Contract - TBD
- [ ] [Avatar NFT Contract](https://etherscan.io/address/0x05745e72fb8b4a9b51118a168d956760e4a36444)
- [ ] LP Staking Contract - TBD

## API

The APIs are a thin wrapper around the contracts designed to get you up and going quickly when directly interacting with the contracts.

## HYCHAIN Node Referee API

Create instance of the Node Referee contract.

*This is the contract responsible for emitting rewards for the HYCHAIN Guardian Nodes.*

```javascript
    import { ethers } from 'ethers'
    import { getHYCHAINNodeRefereeContract, HYCHAINNodeRefereeAPI } from 'hytopia-steaks'

    const provider = new ethers.JsonRpcProvider('https://hychain.calderachain.xyz/http')
    const contact = getHYCHAINNodeRefereeContract(provider)
    const api = new HYCHAINNodeRefereeAPI(contact)
```

Get total rewards claimable for node key IDs

```javascript
    const batchedRewards = await api.claimableNodeKeyRewards([
      100, 101, 102
    ])

    console.log(batchedRewards)
    // [213123123, 1312312312, 23434534433] $TOPIA
```

Get total rewards claimed for node key IDs

```javascript
    const batchedRewards = await api.claimedNodeKeyRewardsBatched([
      100, 101, 102
    ])

    console.log(batchedRewards)
    // [3142313123, 53453453535, 2131342344] $TOPIA
```

Get the total assertions made by the node key token ID

```javascript
    const assertionCount = await api.totalNodeKeyAssertions(100)

    console.log(assertionCount)
    // 12
```

## HYCHAIN Node NFT API

Create instance of the Node NFT contract

```javascript
    import { ethers } from 'ethers'
    import { getHYCHAINNodeNFTContract, HYCHAINNodeKeyAPI } from 'hytopia-steaks'

    const provider = new ethers.JsonRpcProvider('https://hychain.calderachain.xyz/http')
    const contact = getHYCHAINNodeNFTContract(provider)
    const api = new HYCHAINNodeKeyAPI(contact)
```

Get balance of Node keys by address

```javascript
    const nodeKeyOwnedCount = await api.balanceOf('0x122690b8525e6b33f38ff34bdd7644676d9d46d8')

    console.log(nodeKeyOwnedCount)
    // 3
```

Get Node key owner for token ID

```javascript
    const owner = await api.getNodeKeyOwner(2)

    console.log(owner)
    // 0x122690b8525e6b33f38ff34bdd7644676d9d46d8
```

## World API

Create instance of the `WorldEscrowAPI`

```javascript
    import { ethers } from 'ethers'
    import { getWorldEscrowContract, WorldEscrowAPI } from 'hytopia-steaks'

    const provider = new ethers.InfuraProvider("mainnet", "<Your Infura Project ID>")
    const contract = getWorldEscrowContract(provider)
    const api = new WorldEscrowAPI(contract)
```

World info by token ID with owner and associated metadata

```javascript
    const worldInfo = await api.getWorldInfo(999)

    console.log(worldInfo)
    // {
    //    // weight based on rarity
    //     weight: 123
    //
    //     // staked to, otherwise owner == 0
    //     owner: "0x12345"
    // }
```

Check total claimable $TOPIA user rewards by address

```javascript
    const rewards = await api.checkUserRewards('0x12345')

    console.log(rewards)
    // 2131242345243 $TOPIA
```

Get staked tokens by user address

```javascript
    const tokenIds = await api.getUserStakedTokens('0x12345')

    console.log(tokenIds)
    // [123, 456, 999]
```

Get all staked tokens by events

```javascript
    const events = api.getAllStakedTokensByEvents()

    console.log(events)
    // [
    //    {
    //        tokenId: 3000,
    //        owner: "0xE08",
    //        blockNumber: 500,
    //        blockHash: "0x1235",
    //        transactionHash: "0x1236",
    //        removed: false,
    //    },
    //    {
    //        tokenId: 4000,
    //        owner: "0xE09",
    //        blockNumber: 501,
    //        blockHash: "0x1235",
    //        transactionHash: "0x1236",
    //        removed: false,
    //    },
    //    ...
    // ]
```

## Contributing

If you are interested in contributing then please feel free to clone and submit PRs against `main`. All status checks must pass and code coverage is required for both integration tests and unit tests.

### Running the unit tests

`npm run test`

### Running the integration tests

In order to run the integration tests locally you must provide an [INFURA](https://app.infura.io/) API key along with a few `.env` variables.

1. Create a .env file and add the following variables:
    - `INFURA_PROJECT_ID=<Your API Key>`
    - `HYCHAIN_JSON_RPC_URL=https://hychain.calderachain.xyz/http`
    - `TEST_OWNER_WORLD_ADDRESS=<Address owning a HYTOPIA world token>`
    - `TEST_OWNER_WORLD_TOKEN_ID=<TokenId that is currently staked by the above owner address>`
    - `TEST_NODE_ID_WITH_REWARDS=<TokenId that currently has rewards claimed and claimable>`

2. Run the integration tests:
    - `npm run test:integration`
