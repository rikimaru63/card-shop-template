# Card Shop Template - Setup Guide

カードショップEC テンプレートのセットアップガイドです。
`.env` ファイルの編集と画像の差し替えだけで、新しいカードショップサイトを立ち上げられます。

---

## Quick Start（最短セットアップ）

最短5ステップで動くサイトが完成します。

### Step 1: リポジトリをコピー

```bash
git clone https://github.com/rikimaru63/card-shop-template.git my-card-shop
cd my-card-shop
npm install
```

### Step 2: `.env` ファイルを作成

`.env.example` をコピーして、必要な情報を記入します。

```bash
cp .env.example .env
```

最低限これだけ設定すれば動きます：

```env
DATABASE_URL="postgresql://ユーザー名:パスワード@ホスト:5432/データベース名"
NEXTAUTH_URL="https://あなたのドメイン.com"
NEXTAUTH_SECRET="ランダムな文字列（下のコマンドで生成）"
ADMIN_USER="admin"
ADMIN_PASSWORD="管理画面のパスワード"
NEXT_PUBLIC_SITE_NAME="あなたのショップ名"
NEXT_PUBLIC_BASE_URL="https://あなたのドメイン.com"
```

`NEXTAUTH_SECRET` の生成方法（ターミナルで実行）:
```bash
openssl rand -base64 32
```

### Step 3: データベースを準備

```bash
npx prisma db push      # テーブルを作成
npm run db:seed          # 初期カテゴリを登録
```

### Step 4: ロゴと画像を差し替え

`public/` フォルダ内の画像を差し替えます（詳しくは後述）。

### Step 5: 起動

```bash
npm run dev              # 開発モード（http://localhost:3000）
# または
npm run build && npm start  # 本番モード
```

管理画面は `https://あなたのドメイン.com/admin` でアクセスできます。

---

## 1. Environment Variables（環境変数）

`.env` ファイルに設定する項目の一覧です。
`.env.example` をコピーして、値を書き換えてください。

### Required（必須）

サイトが動くために必ず設定が必要な項目です。

| 変数名 | 説明 | 設定例 | どこで取得する？ |
|--------|------|--------|----------------|
| `DATABASE_URL` | データベース（情報を保存する場所）の接続先 | `postgresql://postgres:mypass@db.xxx.supabase.co:5432/postgres` | Supabase / Neon / 自前PostgreSQL |
| `NEXTAUTH_URL` | サイトのURL | `https://my-cardshop.com` | あなたが決めたドメイン |
| `NEXTAUTH_SECRET` | ログイン認証の暗号化キー（外部に漏らさないこと） | `aB3dE5fG7hJ9kL1mN3pQ5rS7tU9vW1x` | `openssl rand -base64 32` で生成 |
| `ADMIN_USER` | 管理画面のユーザー名 | `admin` | 自分で決める |
| `ADMIN_PASSWORD` | 管理画面のパスワード（外部に漏らさないこと） | `MySecurePass123!` | 自分で決める |
| `NEXT_PUBLIC_SITE_NAME` | サイト名（ヘッダーやタイトルに表示） | `Samurai Card Hub` | 自分で決める |
| `NEXT_PUBLIC_BASE_URL` | サイトのベースURL | `https://samuraicardhub.com` | あなたのドメイン |
| `CLOUDINARY_CLOUD_NAME` | 商品画像を保存するサービスの名前 | `my-cloud` | Cloudinary 管理画面 |
| `CLOUDINARY_API_KEY` | Cloudinary の API キー | `123456789012345` | Cloudinary 管理画面 → Settings → Access Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary の API シークレット（外部に漏らさないこと） | `abcDEFghiJKLmnoPQR` | 同上 |
| `RESEND_API_KEY` | メール送信サービスの API キー | `re_xxxxxxxxxxxx` | Resend 管理画面 |
| `EMAIL_FROM` | メールの送信元アドレス | `noreply@my-cardshop.com` | Resend でドメイン認証後に設定 |

### Optional（任意）

設定しなくても動きますが、設定するとより便利になります。

| 変数名 | 説明 | デフォルト値 | 設定例 |
|--------|------|------------|--------|
| `NEXT_PUBLIC_SITE_DESCRIPTION` | サイトの説明文（検索結果などに表示） | `Your premier destination for trading cards` | `日本直送のポケモンカード専門店` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | お問い合わせメールアドレス | （空） | `support@my-cardshop.com` |
| `NEXT_PUBLIC_SUPPORT_PHONE` | お問い合わせ電話番号 | （空） | `+1-234-567-8900` |
| `NEXT_PUBLIC_ADDRESS` | 店舗住所 | （空） | `Tokyo, Japan` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram アカウントの URL | （空） | `https://instagram.com/mycardshop` |
| `NEXT_PUBLIC_TWITTER_URL` | Twitter/X アカウントの URL | （空） | `https://twitter.com/mycardshop` |
| `NEXT_PUBLIC_TWITTER_HANDLE` | Twitter のハンドル名 | （空） | `@mycardshop` |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook ページの URL | （空） | `https://facebook.com/mycardshop` |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube チャンネルの URL | （空） | `https://youtube.com/@mycardshop` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics（アクセス解析）の ID | （空） | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel（Facebook/Instagram広告の計測）の ID | （空） | `1234567890` |
| `NEXT_PUBLIC_SHIPPING_COST` | 送料（日本円） | `4500` | `3000` |
| `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD` | 送料無料になる金額（日本円） | `50000` | `30000` |
| `NEXT_PUBLIC_REGION` | 地域設定（US版かEU版か） | `US` | `US` または `EU` |
| `EMAIL_FROM_NAME` | メール送信者の表示名 | `Card Shop` | `Samurai Card Hub` |
| `WISE_ACCOUNT_HOLDER` | Wise の口座名義 | — | `Your Company Name` |
| `WISE_IBAN` | Wise の IBAN（国際銀行口座番号） | — | `BE12 3456 7890 1234` |
| `WISE_BIC` | Wise の BIC コード | — | `TRWIBEB1XXX` |
| `NEXT_PUBLIC_SEO_KEYWORDS` | SEO（検索最適化）のキーワード | `trading cards, pokemon cards, tcg` | `pokemon cards, japan, tcg` |

---

## 2. Branding（ブランディング）

サイトの見た目を自分のショップに合わせる方法です。

### Site Name & Description（ショップ名と説明文）

`.env` ファイルで設定します。

```env
NEXT_PUBLIC_SITE_NAME="My Card Shop"
NEXT_PUBLIC_SITE_DESCRIPTION="Premium Japanese trading cards shipped worldwide"
```

この名前はサイトのヘッダー、ページタイトル、フッターの著作権表示に使われます。

### Logo & Images（ロゴと画像）

`public/` フォルダ内の画像ファイルを差し替えます。
ファイル名はそのまま、画像だけ入れ替えてください。

| ファイル | 用途 | 推奨サイズ | 形式 |
|---------|------|----------|------|
| `public/logo.jpg` | ヘッダーに表示されるロゴ | 200x60px 程度 | JPG / PNG |
| `public/hero-bg-1.png` | トップページのメイン画像（1枚目） | 1920x800px | PNG / JPG |
| `public/hero-bg-2.png` | トップページのメイン画像（2枚目） | 1920x800px | PNG / JPG |
| `public/hero-bg-3.png` | トップページのメイン画像（3枚目） | 1920x800px | PNG / JPG |
| `public/og-image.jpg` | SNS共有時のサムネイル画像 | 1200x630px | JPG |
| `public/placeholder-card.svg` | 商品画像がないときの仮画像 | 400x560px | SVG |

### Colors（カラー設定）

サイトの配色は `src/styles/globals.css` で変更できます。
色は HSL 形式（色相 彩度% 明度%）で指定します。

主要なカラー変数：

| 変数名 | デフォルト値 | 用途 |
|--------|------------|------|
| `--background` | `40 20% 98%` | ページ背景色（ウォームホワイト） |
| `--foreground` | `220 20% 12%` | メイン文字色 |
| `--primary` | `220 16% 22%` | メインカラー（ボタン等） |
| `--accent` | `28 80% 52%` | アクセントカラー（強調部分） |
| `--destructive` | `0 72% 51%` | エラー・削除の赤色 |
| `--border` | `40 10% 88%` | 枠線の色 |
| `--radius` | `0.5rem` | 角丸の大きさ |

> 色の選択ツール: https://hslpicker.com/ で色を選んで値をコピーできます。

---

## 3. Business Settings（ビジネス設定）

### Shipping（送料）

`.env` ファイルで送料を設定します。金額は日本円です。

```env
NEXT_PUBLIC_SHIPPING_COST="4500"              # 通常送料: 4,500円
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD="50000"    # 50,000円以上で送料無料
```

### Customs Rate（関税率）

`src/lib/constants.ts` で設定されています。

```typescript
export const CUSTOMS_RATE = 0.13        // 13%
export const DUTY_MULTIPLIER = 1.13     // 関税込みの乗数
```

関税率を変更するには `0.13` を希望の税率に変更します。
`DUTY_MULTIPLIER` は自動計算されます。

### Currency（通貨）

デフォルトは日本円（JPY / ¥）です。
`src/lib/config/business.ts` で変更できます。

```typescript
currency: {
  default: "JPY",    // 通貨コード
  symbol: "¥",       // 通貨記号
},
```

### Box Minimum Quantity（ボックスの最低注文数）

ボックス商品の最低注文数はデフォルト5個です。
`src/lib/config/business.ts` の `box.minimumQuantity` で変更できます。

### Product Categories（商品カテゴリ）

デフォルトのカテゴリ: **Pokemon Cards** / **One Piece Cards**

カテゴリを変更するには：

1. `src/lib/config/site.ts` の `dbCategories`（DB登録用）と `categories`（メニュー用）を編集
2. `npm run db:seed` を再実行

---

## 4. External Services（外部サービス）

### Database（PostgreSQL）

おすすめ: [Supabase](https://supabase.com/)（無料プランあり）または [Neon](https://neon.tech/)

初回セットアップ：
```bash
npx prisma db push      # テーブル構造を作成
npm run db:seed          # 初期データを登録
```

### Cloudinary（画像ホスティング）

[Cloudinary](https://cloudinary.com/) で無料アカウントを作成し、管理画面の値を `.env` に設定。

### Resend（メール送信）

[Resend](https://resend.com/) でアカウント作成、送信元ドメインをDNS認証してからAPIキーを発行。

### Wise（決済）

[Wise](https://wise.com/) のビジネスアカウントの銀行口座情報を `.env` に設定。
注文完了メールに振込先情報が記載されます。

---

## 5. Deployment（デプロイ）

### Coolify でのデプロイ手順

1. Coolify にログインし、新しいリソースを作成
2. GitHub リポジトリを接続
3. ビルド設定: ポート `3000`
4. 環境変数を設定（Required セクションの全項目）
5. ドメインを設定（SSL証明書は自動取得）
6. デプロイ実行
7. デプロイ後に `prisma db push` と `db:seed` を実行

---

## 6. Admin Panel（管理画面）

### ログイン方法

`https://あなたのドメイン.com/admin` にアクセスし、`.env` で設定した `ADMIN_USER` / `ADMIN_PASSWORD` でログイン。

### できること

| 機能 | 説明 |
|------|------|
| 商品管理 | 商品の追加・編集・削除、画像アップロード、在庫管理 |
| 注文管理 | 注文一覧の確認、ステータス変更 |
| ユーザー管理 | 登録ユーザーの一覧・管理 |
| お客様の声 | レビューの追加・編集（トップページのカルーセルに表示） |
| CSV取り込み | 商品データの一括登録 |
| お知らせ | サイト上部のお知らせバナーの管理 |

---

## 7. Customization Reference（カスタマイズ早見表）

| 変えたいもの | どこを変える | 補足 |
|-------------|-------------|------|
| サイト名 | `.env` → `NEXT_PUBLIC_SITE_NAME` | ヘッダー・タイトル・フッターに反映 |
| ロゴ | `public/logo.jpg` を差し替え | |
| トップページ画像 | `public/hero-bg-*.png` を差し替え | |
| 配色 | `src/styles/globals.css` のCSS変数 | |
| 送料 | `.env` → `NEXT_PUBLIC_SHIPPING_COST` | ビルド後に反映 |
| 送料無料ライン | `.env` → `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD` | ビルド後に反映 |
| 関税率 | `src/lib/constants.ts` → `CUSTOMS_RATE` | |
| 通貨 | `src/lib/config/business.ts` → `currency` | |
| 商品カテゴリ | `src/lib/config/site.ts` → `dbCategories` + `categories` | seed再実行が必要 |
| SNSリンク | `.env` → `NEXT_PUBLIC_INSTAGRAM_URL` 等 | 空なら非表示 |
| 問い合わせ先 | `.env` → `NEXT_PUBLIC_SUPPORT_EMAIL` 等 | 空なら非表示 |
| 決済方法表示 | `src/lib/config/site.ts` → `paymentMethods` | |
| 管理者パスワード | `.env` → `ADMIN_PASSWORD` | |
| Google Analytics | `.env` → `NEXT_PUBLIC_GA_ID` | 空なら無効 |
| Meta Pixel | `.env` → `NEXT_PUBLIC_META_PIXEL_ID` | 空なら無効 |

---

## よくある質問

**Q: カテゴリを追加したが反映されない**
A: `dbCategories` と `categories` の両方を編集し、`npm run db:seed` を再実行してください。

**Q: ロゴが表示されない**
A: `public/logo.jpg` にファイルがあるか確認。PNG形式なら `site.ts` の `logo.src` を `/logo.png` に変更。

**Q: 送料を変更したのに反映されない**
A: `NEXT_PUBLIC_` の変数はビルド時に固定されます。変更後は `npm run build` を再実行してください。

**Q: メールが届かない**
A: Resend でドメインのDNS認証が完了しているか確認。`EMAIL_FROM` のドメインが認証済みと一致している必要があります。
