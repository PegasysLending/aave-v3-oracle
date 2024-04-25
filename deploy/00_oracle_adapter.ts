import { parseUnits } from "ethers";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ORACLE_ADAPTER_PREFIX } from "../helpers/deploy-ids";
import { ConfigNames, loadPoolConfig } from "../helpers/market-config-helpers";
import { FORK, MARKET_NAME } from "../helpers/env";
import { eNetwork } from "../helpers/types";
import Bluebird from "bluebird";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer, owner } = await getNamedAccounts();
  const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);
  const network = FORK ? FORK as eNetwork : hre.network.name as eNetwork;
  const supraOraclePairs = poolConfig.OracleAdapter[network];
  const supraOracle = poolConfig.SupraOracle[network];
  const oracleUnit = poolConfig.OracleQuoteUnit;
  await Bluebird.each(Object.keys(supraOraclePairs), async symbol => deploy(`${ORACLE_ADAPTER_PREFIX}-${symbol}`, {
    from: deployer,
    contract: 'OracleAdapter',
    proxy: {
      owner: owner,
      execute: {
        init: {
          methodName: "initialize",
          args: [supraOracle, supraOraclePairs[symbol], oracleUnit],
        },
      },
    }
  }));

}

func.id = 'OracleAdapter';
export default func;