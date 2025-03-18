import { address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("EQAq5l6ZdK2JimhY7CJCjrsuT5BaY1M68rsDU8w0P7qPs1zx"),
      owner_address: address(
        "EQAq5l6ZdK2JimhY7CJCjrsuT5BaY1M68rsDU8w0P7qPs1zx"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  await openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
} 