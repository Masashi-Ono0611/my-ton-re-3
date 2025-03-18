import { Address } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const ui = provider.ui();

  const address = await ui.input("Enter contract address:");
  const contract = provider.open(new MainContract(Address.parse(address)));

  const balance = await contract.getBalance();
  ui.write(`Contract balance: ${balance.number / 1000000000} TON`);

  // コントラクトの他の情報も表示
  const data = await contract.getData();
  ui.write(`\nContract details:`);
  ui.write(`- Counter value: ${data.number}`);
  ui.write(`- Recent sender: ${data.recent_sender}`);
  ui.write(`- Owner address: ${data.owner_address}`);
} 