# Kengo Teshima - Personal Website

## 🌐 Website URL
**[https://KengoTeshima.github.io/](https://KengoTeshima.github.io/)**

## 📖 概要 (Overview)

Kengo Teshimaの個人ウェブサイトです。データアナリスト/サイエンティスト/エンジニアとしてのプロフィール、最新記事、SNS活動を統合して紹介しています。

This is Kengo Teshima's personal website featuring his profile as a Data Analyst/Scientist/Engineer, along with his latest articles and SNS activities.

## ✨ 特徴 (Features)

- **プロフィール表示**: データサイエンティストとしての経歴とスキル
- **最新情報統合**: ブログ、Qiita、note、Twitter投稿の統合表示
- **SNSリンク**: Twitter, GitHub, LinkedIn, Qiita, noteへの直接リンク  
- **レスポンシブデザイン**: モバイルとデスクトップ対応
- **履歴書ページ**: プロフェッショナルな経歴の詳細

## 🛠️ 技術スタック (Tech Stack)

- **Static Site Generator**: Hugo (v0.79.1)
- **Theme**: Hugo Coder (カスタマイズ版)
- **Hosting**: GitHub Pages
- **Styling**: CSS3 (カスタムスタイル含む)
- **JavaScript**: フィード統合とTwitterウィジェット
- **Fonts**: Google Fonts (Lato, Merriweather, Source Code Pro)
- **Icons**: Font Awesome 5.11.2

## 📱 ソーシャルメディア統合

- **Twitter**: [@ognek4](https://twitter.com/ognek4/) - 最新ツイートの表示
- **GitHub**: [KengoTeshima](https://github.com/KengoTeshima/) - プロジェクト一覧
- **LinkedIn**: [kengo-teshima](https://www.linkedin.com/in/kengo-teshima-755aa2141/) - プロフェッショナルネットワーク
- **Qiita**: [@ognek](https://qiita.com/ognek) - 技術記事
- **note**: [@ognek4](https://note.com/ognek4) - ブログ記事

## 📁 プロジェクト構造

```
KengoTeshima.github.io/
├── index.html              # メインページ
├── 404.html               # エラーページ
├── css/                   # スタイルシート
│   ├── coder.min.css     # テーマCSS
│   └── custom.css        # カスタムスタイル
├── js/                    # JavaScript
│   └── feed.js           # フィード統合スクリプト
├── images/                # 画像ファイル
│   ├── avatar.jpg        # プロフィール画像
│   ├── favicon-16x16.png # ファビコン
│   └── favicon-32x32.png # ファビコン
├── resume/                # 履歴書ページ
├── categories/            # カテゴリページ
├── tags/                  # タグページ
├── en/                    # 英語版ページ
├── index.xml              # RSS フィード
└── sitemap.xml           # サイトマップ
```

## 🚀 ローカル開発

このサイトはHugoで生成された静的サイトです。ローカルで開発する場合：

```bash
# Hugoのインストール (macOS)
brew install hugo

# 開発サーバー起動
hugo server -D

# 本番ビルド
hugo --minify
```

## 📝 コンテンツ更新

サイトのコンテンツは以下から自動的に取得されます：

- **ブログ記事**: RSS/Atom フィードから取得
- **Qiita記事**: Qiita APIから取得  
- **note記事**: note APIから取得
- **Twitter**: Twitter埋め込みウィジェットで表示

## 📊 パフォーマンス

- **Lighthouse Score**: 高パフォーマンススコア達成
- **静的サイト**: 高速読み込み
- **CDN最適化**: GitHub Pages配信
- **モバイル対応**: レスポンシブデザイン

## 📄 ライセンス

© 2020 Kengo Teshima. サイトはHugoとCoderテーマを使用して構築されています。

---

**Built with**: [Hugo](https://gohugo.io/) & [Coder Theme](https://github.com/luizdepra/hugo-coder/)