import { Address, Cell, contractAddress, toNano } from "@ton/ton";
import { hex } from "../build/main.compiled.json";
import qs from "qs";
import qrcode from "qrcode-terminal";

async function deployScript() {
  const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];
  const dataCell = new Cell();

  const address = contractAddress(0, {
    code: codeCell,
    data: dataCell,
  });

  console.log("Deploy script is running, let's deploy our main.fc contract...");
  console.log("The address of the contract is following:", address.toString({testOnly: true}));

  // Tonhub用のQRコード（テストネット）
  console.log("\nPlease scan the QR code below to deploy using Tonhub (Testnet):");
  let tonhubLink =
    `https://test.tonhub.com/transfer/` +
    address.toString({
      testOnly: true,
    }) +
    "?" +
    qs.stringify({
      text: "Deploy contract",
      amount: toNano(0.01).toString(10),
    });

  qrcode.generate(tonhubLink, { small: true });

  // コントラクトアドレスを表示（手動で入力する場合用）
  console.log("\nIf QR code doesn't work, you can manually enter these details in Tonhub:");
  console.log(`Contract Address: ${address.toString({testOnly: true})}`);
  console.log(`Amount: 0.01 TON`);
}

deployScript(); 