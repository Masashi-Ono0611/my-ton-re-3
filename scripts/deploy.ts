import { Address, Cell, contractAddress, toNano } from "@ton/ton";
import { hex } from "../build/main.compiled.json";
import qs from "qs";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();

async function deployScript() {
  const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];
  const dataCell = new Cell();

  const address = contractAddress(0, {
    code: codeCell,
    data: dataCell,
  });

  console.log("Deploy script is running, let's deploy our main.fc contract...");
  console.log("The address of the contract is following:", address.toString({
    testOnly: process.env.TESTNET ? true : false,
  }));

  // Tonhub用のQRコード
  console.log(`\nPlease scan the QR code below to deploy using Tonhub (${process.env.TESTNET ? "Testnet" : "Mainnet"}):`);
  let tonhubLink =
    `https://${process.env.TESTNET ? "test." : ""}tonhub.com/transfer/` +
    address.toString({
      testOnly: process.env.TESTNET ? true : false,
    }) +
    "?" +
    qs.stringify({
      text: "Deploy contract",
      amount: toNano(0.01).toString(10),
    });

  qrcode.generate(tonhubLink, { small: true });

  // コントラクトアドレスを表示（手動で入力する場合用）
  console.log(`\nIf QR code doesn't work, you can manually enter these details in Tonhub (${process.env.TESTNET ? "Testnet" : "Mainnet"}):`);
  console.log(`Contract Address: ${address.toString({testOnly: process.env.TESTNET ? true : false})}`);
  console.log(`Amount: 0.01 TON`);
}

deployScript(); 