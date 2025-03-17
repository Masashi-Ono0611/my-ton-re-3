# TON Smart Contract Project

このプロジェクトは、TONブロックチェーン上のスマートコントラクト開発プロジェクトです。

## レッスン3.3: シンプルなFunCコントラクトの実装

このブランチでは、以下の機能を持つシンプルなスマートコントラクトを実装しています：

- 内部メッセージの受信と解析
- 送信者アドレスの永続的な保存
- 最新の送信者アドレスを取得するゲッター関数

### デプロイ情報

- テストネットコントラクトアドレス: `kQDUe600N-kN8bYgFMstDeyL5yWvjx05k-9QFP4n2iDVWdSz`

### 実装の詳細

- `recv_internal`: メッセージを受信し、送信者のアドレスを保存
- `get_the_latest_sender`: 最新の送信者アドレスを返すゲッター関数

## 環境設定

必要な依存関係：
- Node.js (v16.15.0以降)
- Yarn パッケージマネージャー

## インストール

```bash
yarn install
```

## ビルド

コントラクトをコンパイルするには：

```bash
yarn compile
```

## デプロイとテスト

コントラクトをデプロイするには：

```bash
yarn deploy:testnet
```

オンチェーンテストを実行するには：

```bash
yarn onchaintest
```

## プロジェクト構造

```
.
├── contracts/     # FunCスマートコントラクトのソースコード
│   ├── main.fc    # メインコントラクト
│   └── imports/   # 依存ライブラリ
├── scripts/       # ビルドスクリプト
└── build/         # コンパイル済みのコントラクト
```

## ライセンス

MIT 