import { task } from "hardhat/config";

task(`print-deployments`).setAction(
  async(_, { deployments, getNamedAccounts, ...hre }) => {
    const allDeployments = await deployments.all();

    const formattedDeployments: { [k: string]: { address: string }} = {};
    console.log("\nDeployments");
    console.log("=================");
    Object.keys(allDeployments).forEach(key => {
      formattedDeployments[key] = {
        address: allDeployments[key].address,
      }
    });

    console.table(formattedDeployments);
  }
)