import { utils, Wallet, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import addresses from "../addresses";

export default async function (hre: HardhatRuntimeEnvironment) {
    //@ts-ignore
    const allAddresses = addresses[process.env.NODE_ENV || "local"]
    const factoryAddress = allAddresses.V3_FACTORY
    const WETHAddress = allAddresses.WETH
    const permit2 = allAddresses.PERMIT2

    let pk_testnet = process.env.pk || ""

    const provider = Provider.getDefaultProvider();

    // console.log(provider)
    const wallet = new Wallet(pk_testnet/* , provider */);
    const deployer = new Deployer(hre, wallet);
    // console.log(deployer)
    // const depositAmount = ethers.utils.parseEther("0.001");
    // const depositHandle = await deployer.zkWallet.deposit({
    //   to: deployer.zkWallet.address,
    //   token: utils.ETH_ADDRESS,
    //   amount: depositAmount,
    // });

    // await depositHandle.wait();

    const artifact = await deployer.loadArtifact("UniversalRouter");
    const unSupportedArtifact = await deployer.loadArtifact("UnsupportedProtocol");
    console.log("deploying unsupported protocol")
    let unsupported = await deployer.deploy(unSupportedArtifact, [])
    console.log(`${unSupportedArtifact.contractName} was deployed to ${unsupported.address}`);


    console.log("Deploying contract...");

    let factoryContract = await deployer.deploy(artifact, [{
        permit2,
        weth9: WETHAddress,
        seaportV1_5: unsupported.address,
        seaportV1_4: unsupported.address,
        openseaConduit: unsupported.address,
        nftxZap: unsupported.address,
        x2y2: unsupported.address,
        foundation: unsupported.address,
        sudoswap: unsupported.address,
        elementMarket: unsupported.address,
        nft20Zap: unsupported.address,
        cryptopunks: unsupported.address,
        looksRareV2: unsupported.address,
        routerRewardsDistributor: unsupported.address,
        looksRareRewardsDistributor: unsupported.address,
        looksRareToken: unsupported.address,
        v2Factory: unsupported.address,
        // v3Factory: factoryAddress,
        v3Factory: factoryAddress,
        pairInitCodeHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        poolInitCodeHash: "0x010011b5a863aee85f9ffb9ff5152cfcd202f5f5ce21f1aeb7c57d30537ffb28",
    }]);

    let constructorArgsEncoded = factoryContract.interface.encodeDeploy([{
        permit2,
        weth9: WETHAddress,
        seaportV1_5: unsupported.address,
        seaportV1_4: unsupported.address,
        openseaConduit: unsupported.address,
        nftxZap: unsupported.address,
        x2y2: unsupported.address,
        foundation: unsupported.address,
        sudoswap: unsupported.address,
        elementMarket: unsupported.address,
        nft20Zap: unsupported.address,
        cryptopunks: unsupported.address,
        looksRareV2: unsupported.address,
        routerRewardsDistributor: unsupported.address,
        looksRareRewardsDistributor: unsupported.address,
        looksRareToken: unsupported.address,
        v2Factory: unsupported.address,
        // v3Factory: factoryAddress,
        v3Factory: factoryAddress,
        pairInitCodeHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        poolInitCodeHash: "0x010011b5a863aee85f9ffb9ff5152cfcd202f5f5ce21f1aeb7c57d30537ffb28",
    }])

    console.log("constructorArgsEncoded", constructorArgsEncoded)

    //@ts-ignore
    const contractAddress = factoryContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

    const verificationId = await hre.run("verify:verify", {
        address: contractAddress,
        // address: "0xB39Eca7aaaccF0D769B604b060Af523D7A349aF7",
        // contract: "UniversalRouter",
        constructorArguments: [{
            permit2,
            weth9: WETHAddress,
            seaportV1_5: unsupported.address,
            seaportV1_4: unsupported.address,
            openseaConduit: unsupported.address,
            nftxZap: unsupported.address,
            x2y2: unsupported.address,
            foundation: unsupported.address,
            sudoswap: unsupported.address,
            elementMarket: unsupported.address,
            nft20Zap: unsupported.address,
            cryptopunks: unsupported.address,
            looksRareV2: unsupported.address,
            routerRewardsDistributor: unsupported.address,
            looksRareRewardsDistributor: unsupported.address,
            looksRareToken: unsupported.address,
            v2Factory: unsupported.address,
            // v3Factory: factoryAddress,
            v3Factory: factoryAddress,
            pairInitCodeHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            poolInitCodeHash: "0x010011b5a863aee85f9ffb9ff5152cfcd202f5f5ce21f1aeb7c57d30537ffb28",
        }]
    });

    console.log("Verification Id", verificationId)

}


// UniversalRouter was deployed to 0x2877da98Dd4Cb2ad2F8d3002Af5f60eE4E813157
// Unsupported 0xBeb5535Df14A6Fe9EB428f041AcD617f4157f910