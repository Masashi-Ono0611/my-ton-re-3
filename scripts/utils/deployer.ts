import { Address, Cell, TonClient4, WalletContractV4, StateInit, internal } from "@ton/ton";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";

export async function deployContract(
  contract: {
    address: Address;
    init: { code: Cell; data: Cell };
  },
  value: bigint,
  client: "mainnet" | "testnet"
) {
  const endpoint = await getHttpV4Endpoint({ network: client });
  const client4 = new TonClient4({ endpoint });

  const walletKey = {
    publicKey: Buffer.from("B5EE9C72C97468FD4B241626B575BDB5B5EE9C72C97468FD4B241626B575BDB5", "hex"),
    secretKey: Buffer.from("B5EE9C72C97468FD4B241626B575BDB5B5EE9C72C97468FD4B241626B575BDB5", "hex"),
  };

  const wallet = WalletContractV4.create({
    publicKey: walletKey.publicKey,
    workchain: 0,
  });

  const walletContract = client4.open(wallet);
  const seqno = await walletContract.getSeqno();

  // StateInitを作成
  const stateInit: StateInit = {
    code: contract.init.code,
    data: contract.init.data,
  };

  await walletContract.sendTransfer({
    seqno,
    secretKey: walletKey.secretKey,
    messages: [
      internal({
        value,
        to: contract.address,
        init: stateInit,
      }),
    ],
  });
} 