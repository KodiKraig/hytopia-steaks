import { ethers } from "ethers"
import { WorldEscrowAPI, WorldStakeEvent } from "../world-escrow"
import { getWorldEscrowContract } from "../contracts/world-escrow-contract"

const STARTING_BLOCK = 19521249
const ENDING_BLOCK = 19539433

describe("WorldEscrowAPI", () => {
  var worldEscrowAPI: WorldEscrowAPI

  beforeEach(() => {
    const provider = new ethers.InfuraProvider("mainnet", process.env.INFURA_PROJECT_ID)
    const contract = getWorldEscrowContract(provider)
    worldEscrowAPI = new WorldEscrowAPI(contract)
  })

  /// World Info

  it("should get world info", async () => {
    const worldInfo = await worldEscrowAPI.getWorldInfo(
      Number(process.env.TEST_OWNER_WORLD_TOKEN_ID),
    )

    expect(worldInfo).toBeDefined()
    expect(worldInfo.owner).toBe(process.env.TEST_OWNER_WORLD_ADDRESS)
  })

  /// User

  it("should get user staked tokens", async () => {
    const stakedTokens = await worldEscrowAPI.getUserStakedTokens(
      process.env.TEST_OWNER_WORLD_ADDRESS!,
    )

    expect(stakedTokens).toBeDefined()
    expect(stakedTokens.length).toBeGreaterThan(0)
    expect(stakedTokens).toContain(Number(process.env.TEST_OWNER_WORLD_TOKEN_ID))
  })

  it("should check user rewards", async () => {
    const userRewards = await worldEscrowAPI.checkUserRewards(process.env.TEST_OWNER_WORLD_ADDRESS!)

    expect(Number(userRewards)).toBeGreaterThan(0)
  })

  /// Stake Events

  it("should get staked events", async () => {
    const tokens = await worldEscrowAPI.getStakedEvents(STARTING_BLOCK, ENDING_BLOCK)

    expect(tokens).toEqual(STAKED_TOKENS)
  })

  it("should get unstake events", async () => {
    const tokens = await worldEscrowAPI.getUnstakedEvents(STARTING_BLOCK, ENDING_BLOCK)

    expect(tokens).toEqual(UNSTAKE_EVENTS)
  })

  it("should get all staked tokens by events", async () => {
    const tokens = await worldEscrowAPI.getAllStakedTokensByEvents(STARTING_BLOCK, ENDING_BLOCK)

    expect(tokens).toEqual(STAKED_TOKENS)
  })
})

const STAKED_TOKENS: WorldStakeEvent[] = [
  {
    tokenId: 6388,
    owner: "0x49E7C2De8b8e4886CE2511Bec96325f96F2D71C3",
    transactionHash: "0xd84400eae963ab7167b52771d4b7b2b018ad78a9247d22e267da31b4d57f8fc7",
    removed: false,
    blockHash: "0x59401a63cf17522982c2b38856abee47fd6a5dfde9f7d50495c86ddb6f935f9a",
    blockNumber: 19521876,
  },
  {
    tokenId: 2009,
    owner: "0x7eb9345a5253A8e070e4a137Ec8460592E778018",
    transactionHash: "0xc6bf7f8c4c0c704c9d9b613b43361de95a2ef3fcab1f0cb8112f0be315ab3335",
    removed: false,
    blockHash: "0x3d3ebdc4ec1fa9d6a63ee69931245740f10415a2d08be7e0f5c1cb5638dd002c",
    blockNumber: 19522711,
  },
  {
    tokenId: 3332,
    owner: "0x753CF57210D2Be5239C26d8C5f0b30013398Aa5F",
    transactionHash: "0x377d87da1cec1c2f624a961ad160eb9fd437c4adc26c1235d289605e2ee31f49",
    removed: false,
    blockHash: "0x6c77ed553a0e235c345fcfab6974acd76746d1a720413b1c096002189963a7b0",
    blockNumber: 19523739,
  },
  {
    tokenId: 3111,
    owner: "0x69E319e13d509bc6F9aD388Da09A76a038215DD0",
    transactionHash: "0xadf42bc37d247308d13e710fc9ad26e0535e866e17185d79dc1a4e0eb3fb2bcd",
    removed: false,
    blockHash: "0x4d531219df851241f217bbbea99831e92f45018468e4ac5208d4c681f13ac5e5",
    blockNumber: 19524023,
  },
  {
    tokenId: 2185,
    owner: "0x05c0Eb3FBD3c4E26FeEb57c5b777EcC7Dc1ED69d",
    transactionHash: "0xb8034a60d46eab50f83ecc454bfc1857cc2e215f2a640712bfccc97e4247a183",
    removed: false,
    blockHash: "0xc0040dabb29db1a447193d678e42f541209ce460ee1f098c3b254e0c4bab7e43",
    blockNumber: 19524362,
  },
  {
    tokenId: 5953,
    owner: "0x78Fd7bc2277E8b0C3db644f725e929a59952fFbb",
    transactionHash: "0x46643e584768842b7c995e3c24d38f46c82c83bffb86bad1e66a4e078fde85b5",
    removed: false,
    blockHash: "0x2617102f732b62fa809f2c39ba8a39208575c87610790710591e4839e3e30a00",
    blockNumber: 19525577,
  },
  {
    tokenId: 2939,
    owner: "0xc61EbEFaA641Fa6b8697Cf4bcA1B4Cf609cA9202",
    transactionHash: "0x645ff5c68764b842ee448f579d9ba59359a84dcf6cf84f172ec897ce5bd8cdf8",
    removed: false,
    blockHash: "0x1a80aec5282d6bd1f3ac69176ce5e861b81a7dd9afd3cdae47df91b9ff43806b",
    blockNumber: 19527018,
  },
  {
    tokenId: 5262,
    owner: "0x16DbCd202be906c36667258799155d48Fb6C9584",
    transactionHash: "0xb80ef19e7469b2f72006bc71407e29c644bda93ded4eb9be6098cc08abe94b06",
    removed: false,
    blockHash: "0xbbc0553e3607fe19bc6b23d5000fedcd45bc5ed1f3107bc2212c2b802ea6a05d",
    blockNumber: 19527943,
  },
  {
    tokenId: 6662,
    owner: "0xBF8AfA76BcC2f7Fee2F3b358571F426a698E5edD",
    transactionHash: "0xfefdd32d548b57bb31515b0c915ac97d4067debb2b46d5668174161eddff137c",
    removed: false,
    blockHash: "0x0990fc04daf8d46b7f3ee97182ce94cafc0e135ab81a9283b21bc54fee2da0c2",
    blockNumber: 19528932,
  },
  {
    tokenId: 3135,
    owner: "0xEE9eAAC0520aE2fa35dabb6FBb1DD3c68E67091b",
    transactionHash: "0x623f987a50c07dbc6f975378de34eedc815de2cf231aba70abf7a98924c16bed",
    removed: false,
    blockHash: "0x1356b35b67944ee80f3bc37af92cf0696e146bdf873130130004031845ad2aa9",
    blockNumber: 19529436,
  },
  {
    tokenId: 2361,
    owner: "0x8F787CAade0BB64c42838197C966Fed04073FCEa",
    transactionHash: "0xbcf58b450187c56d6f7a433b1df57de3d7b887e14e30752849943d6f4d3a398c",
    removed: false,
    blockHash: "0xd3e94fefa9bffec7fb5a36999e8aad73f83bf4862668168f720b9d5df82a359a",
    blockNumber: 19534247,
  },
  {
    tokenId: 8910,
    owner: "0x8F787CAade0BB64c42838197C966Fed04073FCEa",
    transactionHash: "0xbcf58b450187c56d6f7a433b1df57de3d7b887e14e30752849943d6f4d3a398c",
    removed: false,
    blockHash: "0xd3e94fefa9bffec7fb5a36999e8aad73f83bf4862668168f720b9d5df82a359a",
    blockNumber: 19534247,
  },
  {
    tokenId: 8684,
    owner: "0xba6a4922Aa09EaB6b2140c8E5162e1ae047c3ec3",
    transactionHash: "0xd65945ba2e205dc4c45ca653fa02d89ebbcc9ead901a9c20bf8f2212cd69bd9b",
    removed: false,
    blockHash: "0x2584d7b4a6f9e87908fcccd95a39b17e35deda5b77104ced2d054f98ff1feffd",
    blockNumber: 19535673,
  },
  {
    tokenId: 2287,
    owner: "0xE07D604fE3E9263Cb223117113dbcDc86acc78c4",
    transactionHash: "0x82ee6ef77b707e98d0b48d45e246f95d7ed7addfca66a2c01d9934833c28923e",
    removed: false,
    blockHash: "0x4558c66048a5d2c0168d4d20758b68ebe638d856a1b1fd9b8549194470c05759",
    blockNumber: 19537544,
  },
  {
    tokenId: 5256,
    owner: "0x989cd2e1874f0Da82598AfDE0517DF52BFb188cd",
    transactionHash: "0x5b0008dcb37b4963ab9b6e343d6b7fd3ac2d4c52856968c53688b7758696be7e",
    removed: false,
    blockHash: "0x84a6f2af8953485e18b9a069dda072c20b535598fde126922bea9d95c7bd9969",
    blockNumber: 19537960,
  },
]

const UNSTAKE_EVENTS: WorldStakeEvent[] = [
  {
    tokenId: 2715,
    owner: "0xa60bb0D0aF48893369128c850a256B32fD779b6C",
    transactionHash: "0x7032ab25e8180f02286226ddecaef622d83e840c6345309d6e23c29ff5e3f4f5",
    removed: false,
    blockHash: "0x039d6bc8653613ec517eb13506a37d098b336ceb52de80d06f4c4eb94a10dcc7",
    blockNumber: 19522083,
  },
  {
    tokenId: 2009,
    owner: "0x7eb9345a5253A8e070e4a137Ec8460592E778018",
    transactionHash: "0xa4ba007a12bf86ff396d41687653a00e2847033f1556cff597b36bc910f4220c",
    removed: false,
    blockHash: "0x8d1125a1c517af5b38a1f63637ce94c1731cfc483add72effc1be032eb4bfbd2",
    blockNumber: 19522518,
  },
  {
    tokenId: 8910,
    owner: "0x5F51c7dF36B7D97E3b26ED83116e5d9AeF9d4a90",
    transactionHash: "0x2a928e95bd644eb6ab893d4046421cec8d76da414673dc783761cfa5ee975d45",
    removed: false,
    blockHash: "0x133f88fb7d8e0a65ebaba9b0007fba2d21d01407d2ddf11e50ea32fd79338507",
    blockNumber: 19524723,
  },
  {
    tokenId: 2361,
    owner: "0x3c37485a445701f08dcc158cA66C1F625Bc386A6",
    transactionHash: "0xc1716627b65ada70b2a4f6b66688a36139ff7e9167fc65e73a282b7ac298f977",
    removed: false,
    blockHash: "0xb9e951b80a77cbd5362f2872d8caa0fb27de7e705dfa0c520b475e330617d36d",
    blockNumber: 19528186,
  },
  {
    tokenId: 2575,
    owner: "0xA80d786d68215437EC3FEbf31028AE417B8AAbf4",
    transactionHash: "0x6a18078f02ecb8c7a06a8a8a7a070643fa7de850054c5dd521d54c11bb43e1fc",
    removed: false,
    blockHash: "0x5877f58146d9a7c4a3131760eef85c1daa872ae36bdd8f3702d951a3f00d668a",
    blockNumber: 19531956,
  },
  {
    tokenId: 3224,
    owner: "0x68C7B982A8778c36ebc61379e2bb3a982185CDF0",
    transactionHash: "0x5f08e584c9dd81fcad94af9e1af1cf86c8ac859659b4c6ab9e4736183c61a101",
    removed: false,
    blockHash: "0x8addd87d5ace4a4ce9e5c4eb206154db2be8a9fb43e363c39bdf01ce7af31188",
    blockNumber: 19533912,
  },
  {
    tokenId: 2382,
    owner: "0xD246dB3971F3F7dB149B384E116B3474C5BfF659",
    transactionHash: "0x55c0bf041961fd4e276751e0b7c344973e94ecf469e500736fe0aa92822dd1d7",
    removed: false,
    blockHash: "0x3502f8ac9d8859103acf6e9e4dd5add774e514abd8aeaae9598e8713a34ca65a",
    blockNumber: 19535961,
  },
  {
    tokenId: 4764,
    owner: "0xa476686A7F74D2fb28C23Ed3F59aa45557210577",
    transactionHash: "0xecea724a49582929c95a9db4f0ab827c6beba69694221aff36cb42f880a13ea6",
    removed: false,
    blockHash: "0xab21406cfeecec466b41a7b6f6ca229d06ecac3783f140ef17c3a80f76847b81",
    blockNumber: 19537402,
  },
  {
    tokenId: 6001,
    owner: "0x5A439BDf4227d266FB66A6dfd2aC043587A46926",
    transactionHash: "0xaff8c8135d661bfc2399e1abfdc049501ce39f639033d0eac0621b47da0e08a8",
    removed: false,
    blockHash: "0x8eb12aa6cdd0942e0486bc5d75bc0c5f352bfe2580cdf7949c5ab3f70381198c",
    blockNumber: 19537502,
  },
  {
    tokenId: 1573,
    owner: "0xFC78391251874819bBE4530134C438C10288CA73",
    transactionHash: "0x1b9c2d5968367392eec8412e92d53f0da8810c3f61162c8f29b087d7f88b4d8a",
    removed: false,
    blockHash: "0x998364f0363292f18663aaa4c29da3ce348218710aa6310a9387450b8f7fadc6",
    blockNumber: 19539014,
  },
]
