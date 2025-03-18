import { Address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const ui = provider.ui();

  const address = await ui.input("Enter contract address:");
  const increment_by = parseInt(await ui.input("Enter increment amount:"));

  if (isNaN(increment_by)) {
    throw new Error("Invalid increment amount");
  }

  const contract = provider.open(new MainContract(Address.parse(address)));

  await contract.sendIncrement(provider.sender(), toNano("0.05"), increment_by);

  ui.write("Increment transaction sent successfully!");
} 