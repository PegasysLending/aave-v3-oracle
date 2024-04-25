import { BigNumberish } from "ethers";

export type tEthereumAddress = string;

export type eNetwork =
  | eRolluxNetwork

export enum eRolluxNetwork {
  main = "syscoin",
  testnet = "tanenbaum",
}

export type iParamsPerNetwork<T> = {
  [k in eNetwork]: T;
}

export interface ISupraOraclePair {
  [token: string]: BigNumberish
}

export interface ITokenAddress {
  [token: string]: tEthereumAddress
}

export interface IBaseConfiguration {
  MarketId: string;
  OracleQuoteUnit: string;
  SupraOracle: iParamsPerNetwork<tEthereumAddress>;
  OracleAdapter: iParamsPerNetwork<ISupraOraclePair>;
}

export interface ICommonConfiguration extends IBaseConfiguration {}