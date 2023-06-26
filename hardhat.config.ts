import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import dotenv from 'dotenv'
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import 'hardhat-deploy'
import "@matterlabs/hardhat-zksync-verify";
dotenv.config()

const zkSyncNetwork = (() => {
  if (process.env.NODE_ENV == "local") {
    return {
      url: "http://localhost:3050",
      ethNetwork: "http://localhost:8545",
      // ethNetwork: "http://localhost:8646",
      zksync: true,
    }
  } else if (process.env.NODE_ENV == "testnet") {
    return {
      url: "https://testnet.era.zksync.dev",
      // ethNetwork: "goerli",
      ethNetwork: process.env.goerli_rpc,
      zksync: true,
      verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification'
    }
  } else if(process.env.NODE_ENV == "mainnet") {
    return {
      url: process.env.ZKSYNC_MAINNET_RPC,
      ethNetwork: process.env.mainnet_rpc,
      zksync: true,
      verifyURL: process.env.ZKSYNC_MAINNET_VERIFY_URL
    }
  } else {
    throw new Error("Please use one of the following NODE_ENV (local, testnet, mainnet)")
  }
}) ()

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.8.17',
  settings: {
    viaIR: true,
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

export default {
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
  defaultNetwork: "zkSyncNetwork",
  paths: {
    sources: './contracts',
  },
  networks: {
    zkSyncNetwork,
    hardhat: {
      allowUnlimitedContractSize: false,
      chainId: 1,
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        blockNumber: 15360000,
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    arbitrumRinkeby: {
      url: `https://rinkeby.arbitrum.io/rpc`,
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
    },
    optimismKovan: {
      url: `https://kovan.optimism.io`,
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  mocha: {
    timeout: 600000000,
  },
}
