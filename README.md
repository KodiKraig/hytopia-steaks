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
  <strong>A wrapper library around <a href="https://hytopia.com/">HYTOPIA</a> contracts with helper functions to help calculate staking status across the various assets within the ecosystem.</strong>
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

- ✅ [Worlds Staking Contract](https://etherscan.io/address/0x2f53e033c55eb6c87cea259123c0a68ca3578426)
- ☑️ [Worlds NFT Contract](https://etherscan.io/token/0x8d9710f0e193d3f95c0723eaaf1a81030dc9116d)
- ☑️ LP Staking Contract - TBD
- ☑️ Node Staking Contract - TBD
- ☑️ Avatar Staking Contract - TBD
- ☑️ [Avatar NFT Contract](https://etherscan.io/address/0x05745e72fb8b4a9b51118a168d956760e4a36444)

## API

- Create instance of the `WorldEscrowAPI`

```
    import { ethers } from 'ethers'
    import { getWorldEscrowContract, WorldEscrowAPI } from 'hytopia-steaks'

    const provider = new ethers.InfuraProvider("mainnet", "<Your Infura Project ID>")
    const contract = getWorldEscrowContract(provider)
    const api = new WorldEscrowAPI(contract)
```

- World info by token ID with owner and associated metadata

```
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

- Check total claimable $TOPIA user rewards by address

```
    const rewards = await api.checkUserRewards('0x12345')

    console.log(rewards)
    // 999.99 $TOPIA
```

- Get staked tokens by user address

```
    const tokenIds = await api.getUserStakedTokens('0x12345')

    console.log(tokenIds)
    // [123, 456, 999]
```

- Get all staked tokens by events

```
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
    - `TEST_OWNER_WORLD_ADDRESS=<Address owning a HYTOPIA world token>`
    - `TEST_OWNER_WORLD_TOKEN_ID=<TokenId that is currently staked by the above owner address>`

2. Run the integration tests:
    - `npm run test:integration`
