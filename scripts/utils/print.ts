import { Address } from "@ton/ton";

export function printHeader(name: string) {
  console.log(`\n=== ${name} ===`);
}

export function printAddress(address: Address) {
  console.log("コントラクトアドレス:", address.toString());
}

export function printDeploy(address: Address, amount: bigint, contract: string) {
  console.log(`\n${contract}コントラクトをデプロイしています...`);
  console.log("コントラクトアドレス:", address.toString());
  console.log("デプロイ金額:", amount.toString(), "nanoTON");
} 