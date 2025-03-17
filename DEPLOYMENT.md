# デプロイメント情報

## 4_5 デプロイ情報（Testnet）

### コントラクト情報
- デプロイ日時: 2024-03-17
- ネットワーク: Testnet
- コントラクトアドレス: `EQAKRxzoeu1xZEtgVwelgbcvGYJnErFURnAdxsFHvEG5Wi5y`
- Tonscan URL: https://testnet.tonscan.org/address/EQAKRxzoeu1xZEtgVwelgbcvGYJnErFURnAdxsFHvEG5Wi5y

### ウォレット情報
- 使用ウォレット: Tonhub (v2.4.19)
- ウォレットアドレス: `EQAq5l6ZdK2JimhY7CJCjrsuT5BaY1M68rsDU8w0P7qPs1zx`

### デプロイ設定
- 初期カウンター値: 0
- 初期デポジット: 0.05 TON

## 4_6 デプロイ情報（Testnet）

### コントラクト情報
- デプロイ日時: 2024-03-17
- ネットワーク: Testnet
- コントラクトアドレス: `EQCDd9nCiHMj5g27QATPCRVGr_0OzLvvenVK8xz9J29p6dX4`
- Tonscan URL: https://testnet.tonscan.org/address/EQCDd9nCiHMj5g27QATPCRVGr_0OzLvvenVK8xz9J29p6dX4

### ウォレット情報
- 使用ウォレット: Tonkeeper
- ウォレットアドレス: `EQAq5l6ZdK2JimhY7CJCjrsuT5BaY1M68rsDU8w0P7qPs1zx`

### デプロイ設定
- 初期カウンター値: 0
- 初期デポジット: 0.05 TON

### トラブルシューティング
QRコードが表示されない場合の対処方法：
1. `rm -rf temp/testnet/tonconnect.json` を実行してウォレット接続情報を削除
2. `rm -rf node_modules yarn.lock && yarn cache clean && yarn install` を実行して依存関係を再インストール
3. `yarn deploy` を実行して再デプロイを試みる

これらの手順により、ウォレット接続が正常にリセットされ、QRコードが再び表示されるようになります。 