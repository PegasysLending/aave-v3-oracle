import { EasylendMarket } from "../markets/easylend";
import { ICommonConfiguration } from "./types";

export enum ConfigNames {
  Easylend = "Easylend",
  Commons = "Commons",
}

export const loadPoolConfig = (configName: ConfigNames): ICommonConfiguration => {
  switch (configName) {
    case ConfigNames.Easylend:
      return EasylendMarket;
    default:
      throw new Error(
        `Unsupported pool configuration: ${configName}`
      )
  }
}