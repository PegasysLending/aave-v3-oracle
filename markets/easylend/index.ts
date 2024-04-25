import { ICommonConfiguration, eRolluxNetwork } from "../../helpers/types";

export const EasylendMarket: ICommonConfiguration = {
  MarketId: 'Easylend Aave Market',
  OracleQuoteUnit: '8',
  SupraOracle: {
    [eRolluxNetwork.main]: '',
    [eRolluxNetwork.testnet]: '0x14Dbb98a8e9A77cE5B946145bb0194aDE5dA7611',
  },
  OracleAdapter: {
    [eRolluxNetwork.main]: {
      BTC: 18,
      WETH: 19,
      WSYS: 94, //SYS_USDT
      USDT: 48,
      USDC: 89,
    },
    [eRolluxNetwork.testnet]: {
      BTC: 18,
      WETH: 19,
      WSYS: 94, //SYS_USDT
      USDT: 48,
      USDC: 89,
    },
  }
}