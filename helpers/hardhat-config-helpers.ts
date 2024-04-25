import { eRolluxNetwork, iParamsPerNetwork } from "./types";

export const NETWORKS_RPC_URL: iParamsPerNetwork<string> = {
  [eRolluxNetwork.main]: `https://rpc.rollux.com`,
  [eRolluxNetwork.testnet]: `https://rpc-tanenbaum.rollux.com`,
}

export const LIVE_NETWORKS: iParamsPerNetwork<boolean> = {
  [eRolluxNetwork.main]: true,
  [eRolluxNetwork.testnet]: true,
};

export const DEFAULT_BLOCK_GAS_LIMIT = 12450000;
export const DEFAULT_GAS_PRICE = 8000000000;