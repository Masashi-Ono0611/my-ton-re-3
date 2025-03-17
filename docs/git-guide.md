# Git/GitHub 利用ガイド

## 基本的なGitコマンド

### 1. 日常的な開発作業

```bash
# 変更状態の確認
git status

# 変更内容の確認
git diff

# 変更をステージングに追加
git add ファイル名    # 特定のファイルを追加
git add .          # すべての変更を追加

# 変更を記録（コミット）
git commit -m "変更内容の説明"

# リモートの最新変更を取得
git pull origin main

# 変更をGitHubにアップロード
git push origin ブランチ名
```

### 2. ブランチ操作

```bash
# ブランチの作成と切り替え
git checkout -b feature/機能名    # 新機能開発用
git checkout -b fix/バグ名       # バグ修正用

# ブランチの一覧表示
git branch

# ブランチの切り替え
git checkout ブランチ名
```

### 3. よく使うシナリオ

#### 新機能の開発
```bash
# 1. mainブランチを最新化
git checkout main
git pull origin main

# 2. 開発用ブランチを作成
git checkout -b feature/新機能名

# 3. 開発作業と定期的なコミット
git add .
git commit -m "機能追加: XXXの実装"

# 4. GitHubにプッシュ
git push origin feature/新機能名
```

#### バグ修正
```bash
# 1. バグ修正用ブランチを作成
git checkout -b fix/バグの説明

# 2. 修正作業とコミット
git add .
git commit -m "修正: XXXの問題を解決"

# 3. GitHubにプッシュ
git push origin fix/バグの説明
```

## GitHubでの作業

### 1. Pull Request (PR)の作成
1. GitHubのリポジトリページにアクセス
2. `Pull requests`タブを選択
3. `New pull request`ボタンをクリック
4. ベースブランチ（通常は`main`）と作業ブランチを選択
5. 変更内容を説明して`Create pull request`をクリック

### 2. コードレビュー
1. PRページでコードの変更を確認
2. コメントが必要な箇所に行単位でコメントを追加
3. 全体的なフィードバックを記入
4. 承認または修正リクエスト

### 3. PRのマージ
1. レビューが承認されたことを確認
2. `Merge pull request`ボタンをクリック
3. マージ完了後、作業ブランチを削除

## 注意事項

- コミットメッセージは具体的で分かりやすく書く
- 定期的に`git pull`で最新コードを取得する
- 大きな変更は小さな単位に分けてPRを作成する
- 機密情報（APIキーなど）は絶対にGitHubにアップロードしない
- 困ったときは`git status`で状態を確認する 