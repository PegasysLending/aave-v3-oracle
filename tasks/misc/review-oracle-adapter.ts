import { task } from "hardhat/config";
import { ORACLE_ADAPTER_PREFIX } from "../../helpers/deploy-ids";
import { FORK, MARKET_NAME } from "../../helpers/env";
import { eNetwork } from "../../helpers/types";
import { ConfigNames, loadPoolConfig } from "../../helpers/market-config-helpers";
import Bluebird from "bluebird";

task(`review-oracle-adapter`)
  .setAction(async (_, { deployments, getNamedAccounts, ...hre }) => {
    console.log("start review");
    const network = FORK ? FORK : hre.network.name;
    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
    const supraOraclePairs = poolConfig.OracleAdapter[network as eNetwork];
    const formattedPrice: { [k: string]: { address: string, currentPrice: bigint } } = {};
    await Bluebird.all(Object.keys(supraOraclePairs).map(async symbol => {
      const chainlinkAggrator = await hre.ethers.getContractAt('OracleAdapter', (await deployments.get(`${ORACLE_ADAPTER_PREFIX}-${symbol}`)).address);
      const price = await chainlinkAggrator.latestAnswer();
      if (price <= 0) {
        throw (`${symbol} price is invalid with ${price}`)
      } else {
        formattedPrice[symbol] = { address: await chainlinkAggrator.getAddress(), currentPrice: price }
      }
    }))
    console.table(formattedPrice);


  })