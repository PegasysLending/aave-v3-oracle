import { HardhatUserConfig } from "hardhat/config";
import '@nomicfoundation/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import fs from "fs";
import path from "path";
import { FORK, MNEMONIC, MNEMONIC_PATH } from "./helpers/env";
import { DEFAULT_BLOCK_GAS_LIMIT, NETWORKS_RPC_URL } from "./helpers/hardhat-config-helpers";
import { eNetwork } from "./helpers/types";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_FOLDERS = ["misc"];

const loadTasks = (taskFolders: string[]): void =>
  taskFolders.forEach((folder) => {
    const tasksPath = path.join(__dirname, "./tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((pth) => pth.includes(".ts") || pth.includes(".js"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });

if (!SKIP_LOAD) {
  loadTasks(TASK_FOLDERS);
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      }
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    owner: {
      default: 1,
    }
  },
  networks: {
    hardhat: {
      ...{
        forking: FORK ? {
          url: NETWORKS_RPC_URL[FORK as eNetwork] ? NETWORKS_RPC_URL[FORK as eNetwork] : ''
        } : undefined
      },
      accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        accountsBalance: (BigInt(10) ** BigInt(22)).toString()
      }
    },
    tanenbaum: {
      url: NETWORKS_RPC_URL['tanenbaum'] || "",
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH
      }
    }
  }
};

export default config;
