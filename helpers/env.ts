import { ConfigNames } from "./market-config-helpers";
require("dotenv").config();


export const MNEMONIC_PATH = "m/44'/60'/0'/0";
export const MNEMONIC = process.env.MNEMONIC || "";

export const MARKET_NAME = (process.env.MARKET_NAME as ConfigNames) || ConfigNames.Commons;
export const FORK = process.env.FORK;