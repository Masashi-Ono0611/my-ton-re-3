import { Address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const ui = provider.ui();

  const address = await ui.input("Enter contract address:");
  const withdraw_amount = parseFloat(await ui.input("Enter withdrawal amount in TON:"));

  if (isNaN(withdraw_amount)) {
    throw new Error("Invalid withdrawal amount");
  }

  const contract = provider.open(new MainContract(Address.parse(address)));

  await contract.sendWithdrawalRequest(
    provider.sender(),
    toNano("0.05"), // トランザクション手数料
    toNano(withdraw_amount.toString()) // 引き出し額
  );

  ui.write("Withdrawal request sent successfully!");
} 