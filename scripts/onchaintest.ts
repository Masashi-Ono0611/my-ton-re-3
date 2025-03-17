import { Address, Cell, contractAddress, toNano } from "@ton/ton";
import { hex } from "../build/main.compiled.json";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { TonClient4 } from "@ton/ton";
import qs from "qs";
import qrcode from "qrcode-terminal";
import dotenv from "dotenv";

dotenv.config();

async function onchainTestScript() {
  const codeCell = Cell.fromBoc(Buffer.from(hex, "hex"))[0];
  const dataCell = new Cell();

  const address = contractAddress(0, {
    code: codeCell,
    data: dataCell,
  });

  const endpoint = await getHttpV4Endpoint({
    network: process.env.TESTNET ? "testnet" : "mainnet",
  });
  const client4 = new TonClient4({ endpoint });

  const latestBlock = await client4.getLastBlock();
  let status = await client4.getAccount(latestBlock.last.seqno, address);

  if (status.account.state.type !== "active") {
    console.log("コントラクトがアクティブではありません");
    return;
  }

  console.log("\n=== コントラクトの状態 ===");
  console.log(`ネットワーク: ${process.env.TESTNET ? "Testnet" : "Mainnet"}`);
  console.log(`コントラクトアドレス: ${address.toString({
    testOnly: process.env.TESTNET ? true : false,
  })}`);
  console.log(`残高: ${status.account.balance.coins} nanoTON`);
  
  // 最新の送信者を取得
  const { exitCode: senderExitCode, result: senderResult } = await client4.runMethod(
    latestBlock.last.seqno,
    address,
    "get_the_latest_sender"
  );

  if (senderExitCode === 0 && senderResult[0].type === "slice") {
    const latest_sender = senderResult[0].cell.beginParse().loadAddress();
    console.log(`最新の送信者: ${latest_sender.toString({
      testOnly: process.env.TESTNET ? true : false,
    })}`);

    // msg_valueを取得
    const { exitCode: valueExitCode, result: valueResult } = await client4.runMethod(
      latestBlock.last.seqno,
      address,
      "get_msg_value"
    );
    if (valueExitCode === 0 && valueResult[0].type === "int") {
      console.log(`最新のメッセージ値: ${valueResult[0].value} nanoTON`);
    }

    // flagsを取得
    const { exitCode: flagsExitCode, result: flagsResult } = await client4.runMethod(
      latestBlock.last.seqno,
      address,
      "get_flags"
    );
    if (flagsExitCode === 0 && flagsResult[0].type === "int") {
      console.log(`最新のフラグ: ${flagsResult[0].value}`);
    }
  } else {
    console.log("最新の送信者: 未設定");
  }

  // Tonhub用のQRコード
  console.log(`\nTonhubでテストトランザクションを送信するには、以下のQRコードをスキャンしてください (${process.env.TESTNET ? "Testnet" : "Mainnet"}):`);
  let tonhubLink =
    `https://${process.env.TESTNET ? "test." : ""}tonhub.com/transfer/` +
    address.toString({
      testOnly: process.env.TESTNET ? true : false,
    }) +
    "?" +
    qs.stringify({
      text: "Simple test transaction",
      amount: toNano(0.01).toString(10),
    });

  qrcode.generate(tonhubLink, { small: true });

  // コントラクトアドレスを表示（手動で入力する場合用）
  console.log(`\nQRコードが機能しない場合は、以下の情報を手動で入力してください (${process.env.TESTNET ? "Testnet" : "Mainnet"}):`);
  console.log(`コントラクトアドレス: ${address.toString({testOnly: process.env.TESTNET ? true : false})}`);
  console.log(`送金額: 0.01 TON`);

  let lastBalance = BigInt(status.account.balance.coins);
  let lastSender: Address | undefined;

  console.log("\n=== トランザクション監視中 ===");
  console.log("Ctrl+Cで終了します...\n");

  setInterval(async () => {
    try {
      const latestBlock = await client4.getLastBlock();
      const currentStatus = await client4.getAccount(latestBlock.last.seqno, address);
      const currentBalance = BigInt(currentStatus.account.balance.coins);
      
      // 残高の変更を検出
      if (currentBalance !== lastBalance) {
        console.log("\n=== 新しいトランザクションを検出 ===");
        console.log("タイムスタンプ:", new Date().toLocaleString());
        console.log(`前回の残高: ${lastBalance} nanoTON`);
        console.log(`現在の残高: ${currentBalance} nanoTON`);
        console.log(`変更額: ${(currentBalance - lastBalance).toString()} nanoTON`);
        
        // 最新の送信者を取得
        const { exitCode, result } = await client4.runMethod(
          latestBlock.last.seqno,
          address,
          "get_the_latest_sender"
        );

        if (exitCode === 0 && result[0].type === "slice") {
          const latest_sender = result[0].cell.beginParse().loadAddress();
          if (!lastSender || lastSender.toString() !== latest_sender.toString()) {
            console.log(`送信者: ${latest_sender.toString({
              testOnly: process.env.TESTNET ? true : false,
            })}`);

            // msg_valueを取得
            const { exitCode: valueExitCode, result: valueResult } = await client4.runMethod(
              latestBlock.last.seqno,
              address,
              "get_msg_value"
            );
            if (valueExitCode === 0 && valueResult[0].type === "int") {
              console.log(`メッセージ値: ${valueResult[0].value} nanoTON`);
            }

            // flagsを取得
            const { exitCode: flagsExitCode, result: flagsResult } = await client4.runMethod(
              latestBlock.last.seqno,
              address,
              "get_flags"
            );
            if (flagsExitCode === 0 && flagsResult[0].type === "int") {
              console.log(`フラグ: ${flagsResult[0].value}`);
            }

            lastSender = latest_sender;
          }
        }

        console.log("----------------------------------------");
        lastBalance = currentBalance;
      }
    } catch (error) {
      console.error("トランザクションの確認中にエラーが発生しました:", error);
    }
  }, 2000);
}

onchainTestScript(); 