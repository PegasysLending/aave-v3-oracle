import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  console.log("=== Post deployment hook ===");

  console.log("Review OracleAdapter");
  await hre.run('review-oracle-adapter');
  await hre.run('print-deployments');
}

func.runAtTheEnd = true;
export default func;