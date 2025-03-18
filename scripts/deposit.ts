import { Address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const ui = provider.ui();

  const address = await ui.input("Enter contract address:");
  const deposit_amount = parseFloat(await ui.input("Enter deposit amount in TON:"));

  if (isNaN(deposit_amount)) {
    throw new Error("Invalid deposit amount");
  }

  const contract = provider.open(new MainContract(Address.parse(address)));

  await contract.sendDeposit(provider.sender(), toNano(deposit_amount.toString()));

  ui.write("Deposit transaction sent successfully!");
} 