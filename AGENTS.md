# AGENTS.md — KengoTeshima.github.io

**⚠ このリポジトリは PUBLIC です** (`https://KengoTeshima.github.io/`)。commit はすべて全世界から閲覧可能。

---

## 絶対禁止 (自動化モードでも例外なし)

1. **新しい email アドレスを追加しない**。本人の公開済ハンドル以外は NG。
   - 許容: `teshikenn4`, `teshikenn`, `ognek`/`ognek4`, `kengo-teshima`, `*@users.noreply.github.com`, `*@{example,test}.{com,org,net}`
2. **API キー / トークン / webhook URL / JWT / 個人識別子を書き込まない**。コメントやダミー含む。`global secret-scanner.sh` が書込時に regex 検査してブロックする。
3. **tracking ID を追加しない**。Google Analytics / GTM / Plausible / Facebook Pixel など、新規追加は必ずユーザー確認。
4. **LinkedIn 以外の外部サービス埋込を追加する場合は確認を取る**。現状: X widget, note RSS (allorigins.win 経由), Font Awesome / Google Fonts CDN のみ。
5. **.env / credentials / *.key / *.pem / *webhook* の読み書きは全面禁止**。グローバル deny で封鎖済み。

## 変更手順（自動化モードでも）

1. `git status --short` と対象ファイルの差分を確認し、既存の作業を上書きしない。
2. **変更前に予定差分を要約し、security-guard（利用可能な場合）またはユーザーにレビューを依頼する**。大規模な削除も同様。
3. **user-visible な変更**（文面・色・レイアウト・リンク先）は必ずユーザーの承認を得る。
4. **user-invisible な内部変更**（dead CSS 削除、コメント修正、空白整理）は自動で進めてよい。
5. 変更後はHTML構文、内部参照、外部リンク属性、差分を検証する。
6. commit message は変更内容の要約のみ。個人情報は入れない。

## サイト構成

- ビルドツール **不使用** — 純粋な静的 HTML/CSS/JS
- 主要ファイル: `index.html`, `404.html`, `css/custom.css`, `js/feed.js`, `sitemap.xml`, `index.xml`
- 言語属性: HTMLページは `lang="ja"`
- 配色トークン: `css/custom.css` のCSS変数で一元管理、WCAG AA準拠 (`--text-muted` 修正済)
- JS 動的クラス参照: `js/feed.js:66` で `.hero-grid` を参照 → CSS から削除しない

## CSS 編集ルール

- 新規 selector を追加する前に、既存の類似ルール (token, component class) を再利用できないか確認
- `!important` は print / focus-visible overrides でのみ許容
- 削除前に必ず全 HTML + JS での参照を grep

## リンクと外部依存

- `allorigins.win` (note RSS proxy, `js/feed.js:158`) — 将来差し替え候補、現状維持
- Google Fonts (Inter), Font Awesome 6 (CDN) — 削減候補あるが変更は user 確認
- 外部URLを追加する場合: `rel="noopener noreferrer"` を必須

## エージェント用skill

- Codex: `.agents/skills/maintain-public-site/SKILL.md`
- Claude: `.claude/skills/maintain-public-site/SKILL.md`
- どちらも、このファイルを共通ポリシーの正本として扱う。ルールを複製して乖離させない。
