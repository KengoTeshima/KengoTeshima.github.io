# Kengo Teshima — Personal Website

**[https://KengoTeshima.github.io/](https://KengoTeshima.github.io/)**

個人サイト — 興味と問いを起点に、領域を横断して考える。

---

## 特徴

- **ミニマル構成**: 名前・一文・外部リンクだけのトップページ
- **リンク集**: X / GitHub / LinkedIn / note / YouTube
- **ダークモード**: ライト/ダーク切り替え対応（localStorage 永続化）
- **レスポンシブ**: モバイル・デスクトップ両対応

## デザインシステム

| 要素 | 詳細 |
|------|------|
| フォント | Manrope + Noto Sans JP (Google Fonts) |
| アクセント | Signal Coral `#ff6b47` + Acid Lime `#c9f36b` |
| 背景 (dark) | Warm Ink `#11120f` |
| レイアウト | 大きなタイポグラフィ + テキストリンク |
| イメージ | なし |
| アニメーション | Intersection Observer による控えめな fade-up |

## 技術スタック

- **Static HTML/CSS/JS** — ビルドツール不使用、純粋な静的ファイル
- **ホスティング**: GitHub Pages
- **フォント**: Google Fonts (Manrope / Noto Sans JP)

## SNS

| プラットフォーム | リンク |
|---|---|
| X | [@teshikenn4](https://twitter.com/teshikenn4) |
| GitHub | [KengoTeshima](https://github.com/KengoTeshima/) |
| LinkedIn | [kengo-teshima](https://www.linkedin.com/in/kengo-teshima-755aa2141/) |
| note | [@ognek4](https://note.com/ognek4) |
| YouTube | [Drums playlist](https://youtube.com/playlist?list=PLJ99EoR4L7qrZxtqN10wDPz51UBpqKBsa) |

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
