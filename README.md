# Kengo Teshima — Personal Website

**[https://KengoTeshima.github.io/](https://KengoTeshima.github.io/)**

個人サイト — 興味と問いを起点に、領域を横断して考える。

---

## 特徴

- **プロフィール**: 「判断が良くなる仕組み」を軸にした自己紹介
- **最新情報**: note RSS フィード & X タイムラインを統合表示
- **Thinking themes**: データ×事業、AI×商取引、行動変容、ジャズとユーモア
- **ダークモード**: ライト/ダーク切り替え対応（localStorage 永続化）
- **レスポンシブ**: モバイル・デスクトップ両対応

## デザインシステム

| 要素 | 詳細 |
|------|------|
| フォント | Manrope + Noto Sans JP (Google Fonts) |
| アクセント | Signal Coral `#ff6b47` + Acid Lime `#c9f36b` |
| 背景 (dark) | Warm Ink `#11120f` + editorial grid |
| カード | Solid bento grid + asymmetric editorial layout |
| イメージ | 既存ポートレートを主役にしたアーチ型フレーム |
| アニメーション | Intersection Observer による控えめな fade-up |

## 技術スタック

- **Static HTML/CSS/JS** — ビルドツール不使用、純粋な静的ファイル
- **ホスティング**: GitHub Pages
- **フォント**: Google Fonts (Inter)
- **アイコン**: Font Awesome 6
- **フィード取得**: RSS/Atom (note) + allorigins.win プロキシ
- **X**: 埋め込みウィジェット

## SNS

| プラットフォーム | リンク |
|---|---|
| X | [@teshikenn4](https://twitter.com/teshikenn4) |
| GitHub | [KengoTeshima](https://github.com/KengoTeshima/) |
| LinkedIn | [kengo-teshima](https://www.linkedin.com/in/kengo-teshima-755aa2141/) |
| Qiita | [@ognek](https://qiita.com/ognek) |
| note | [@ognek4](https://note.com/ognek4) |
| YOUTRUST | [teshikenn](https://youtrust.jp/users/teshikenn) |

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
