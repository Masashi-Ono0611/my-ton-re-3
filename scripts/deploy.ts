import { Cell, beginCell, contractAddress, toNano } from "@ton/ton";
import { deployContract } from "./utils/deployer";
import { printAddress, printDeploy, printHeader } from "./utils/print";
import { hex } from "../build/main.compiled.json";
import qs from "qs";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  // initialize counter with 0 and empty address
  const initDataCell = beginCell()
    .storeUint(0, 32) // counter_value = 0
    .storeAddress(null) // empty sender address
    .endCell();

  const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];

  const address = contractAddress(0, {
    code: codeCell,
    data: initDataCell,
  });

  const deployAmount = toNano("0.01");

  const isTestnet = process.env.TESTNET === "true";
  const client = isTestnet ? "testnet" : "mainnet";

  printHeader("deploy.ts");
  printAddress(address);
  
  try {
    await deployContract(
      {
        address,
        init: {
          code: codeCell,
          data: initDataCell,
        },
      },
      deployAmount,
      client
    );
    printDeploy(address, deployAmount, "main.fc");

    // Tonkeeper用のQRコード
    console.log(`\nTonkeeperでデプロイするには、以下のQRコードをスキャンしてください (${isTestnet ? "Testnet" : "Mainnet"}):`);
    let tonkeeperLink = `tonkeeper://v2/transfer/${address.toString({
      testOnly: isTestnet,
    })}?${qs.stringify({
      text: "Deploy main.fc",
      amount: deployAmount.toString(10),
    })}`;

    qrcode.generate(tonkeeperLink, { small: true });

    // TON Space Wallet用のQRコード
    console.log(`\nTON Space Walletでデプロイするには、以下のQRコードをスキャンしてください (${isTestnet ? "Testnet" : "Mainnet"}):`);
    let tonSpaceLink = `tonsafe://transfer/${address.toString({
      testOnly: isTestnet,
    })}?${qs.stringify({
      text: "Deploy main.fc",
      amount: deployAmount.toString(10),
    })}`;

    qrcode.generate(tonSpaceLink, { small: true });

    // 手動入力用の情報を表示
    console.log(`\nQRコードが機能しない場合は、以下の情報を手動で入力してください (${isTestnet ? "Testnet" : "Mainnet"}):`);
    console.log(`コントラクトアドレス: ${address.toString({testOnly: isTestnet})}`);
    console.log(`送金額: 0.01 TON`);
  } catch (error) {
    console.error("デプロイ中にエラーが発生しました:", error);
  }
})(); 