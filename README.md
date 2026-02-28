# Kengo Teshima — Personal Website

**[https://KengoTeshima.github.io/](https://KengoTeshima.github.io/)**

Data Analyst / Scientist / Engineer のポートフォリオサイト。

---

## 特徴

- **プロフィール**: データ領域でのスキル・経歴を紹介
- **専門領域**: 戦略 & インサイト / ML プロダクション化 / データ体験
- **スキルストリップ**: 使用技術をタグ形式で表示
- **最新情報**: note RSS フィード & Twitter タイムラインを統合表示
- **ダークモード**: ライト/ダーク切り替え対応（localStorage 永続化）
- **レスポンシブ**: モバイル・デスクトップ両対応
- **職務経歴書**: `/resume/` ページ

## デザインシステム

| 要素 | 詳細 |
|------|------|
| フォント | Inter (Google Fonts) |
| アクセント | Sky Blue `#38bdf8` → Indigo `#818cf8` → Violet `#c084fc` |
| 背景 (dark) | Deep Navy `#030712` + アンビエント Orb + Grain texture |
| カード | Glassmorphism (`backdrop-filter: blur`) |
| テクスチャ | SVG Fractal Noise grain overlay (`opacity: 0.04`) |
| アニメーション | Intersection Observer scroll fade-up / ボタンシャイン sweep |

## 技術スタック

- **Static HTML/CSS/JS** — ビルドツール不使用、純粋な静的ファイル
- **ホスティング**: GitHub Pages
- **フォント**: Google Fonts (Inter)
- **アイコン**: Font Awesome 6
- **フィード取得**: RSS/Atom (note) + allorigins.win プロキシ
- **Twitter**: 埋め込みウィジェット

## SNS

| プラットフォーム | リンク |
|---|---|
| Twitter | [@teshikenn4](https://twitter.com/teshikenn4) |
| GitHub | [KengoTeshima](https://github.com/KengoTeshima/) |
| LinkedIn | [kengo-teshima](https://www.linkedin.com/in/kengo-teshima-755aa2141/) |
| Qiita | [@ognek](https://qiita.com/ognek) |
| note | [@ognek4](https://note.com/ognek4) |

## ディレクトリ構成

```
KengoTeshima.github.io/
├── index.html        # メインページ
├── 404.html          # エラーページ
├── css/
│   └── custom.css    # デザインシステム全体
├── js/
│   └── feed.js       # テーマ切替・スクロールアニメ・フィード取得
├── images/           # アバター・ファビコン等
├── resume/           # 職務経歴書ページ
├── index.xml         # RSS フィード
└── sitemap.xml       # サイトマップ
```

## ローカル確認

静的ファイルのため、任意の HTTP サーバーで動作します。

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

---

© 2026 Kengo Teshima
