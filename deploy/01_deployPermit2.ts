import { utils, Wallet, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import addresses from "../addresses";

export default async function (hre: HardhatRuntimeEnvironment) {
    let pk_testnet = process.env.pk || ""

    const provider = Provider.getDefaultProvider();
    const wallet = new Wallet(pk_testnet/* , provider */);
    const deployer = new Deployer(hre, wallet);

    const artifact = await deployer.loadArtifact("Permit2");
    console.log('Deploying Permit2')

    const permit2 = await deployer.deploy(artifact, [])
    console.log('permit2 deployed to ', permit2.address)

    await hre.run("verify:verify", {
        address: permit2.address,
        constructorArguments: []
    })

}