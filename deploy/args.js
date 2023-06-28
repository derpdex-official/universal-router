const addresses = require('../addresses').default
require('dotenv').config()

const params = [
    {
        permit2: addresses[process.env.NODE_ENV].PERMIT2,
        weth9: addresses[process.env.NODE_ENV].WETH,
        seaportV1_5: addresses[process.env.NODE_ENV].UNSUPPORTED,
        seaportV1_4: addresses[process.env.NODE_ENV].UNSUPPORTED,
        openseaConduit: addresses[process.env.NODE_ENV].UNSUPPORTED,
        nftxZap: addresses[process.env.NODE_ENV].UNSUPPORTED,
        x2y2: addresses[process.env.NODE_ENV].UNSUPPORTED,
        foundation: addresses[process.env.NODE_ENV].UNSUPPORTED,
        sudoswap: addresses[process.env.NODE_ENV].UNSUPPORTED,
        elementMarket: addresses[process.env.NODE_ENV].UNSUPPORTED,
        nft20Zap: addresses[process.env.NODE_ENV].UNSUPPORTED,
        cryptopunks: addresses[process.env.NODE_ENV].UNSUPPORTED,
        looksRareV2: addresses[process.env.NODE_ENV].UNSUPPORTED,
        routerRewardsDistributor: addresses[process.env.NODE_ENV].UNSUPPORTED,
        looksRareRewardsDistributor: addresses[process.env.NODE_ENV].UNSUPPORTED,
        looksRareToken: addresses[process.env.NODE_ENV].UNSUPPORTED,
        v2Factory: addresses[process.env.NODE_ENV].UNSUPPORTED,
        v3Factory: addresses[process.env.NODE_ENV].V3_FACTORY,
        pairInitCodeHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        poolInitCodeHash: "0x010011b5a863aee85f9ffb9ff5152cfcd202f5f5ce21f1aeb7c57d30537ffb28",
    }
]

console.log('params', params);
module.exports = params;