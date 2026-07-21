---
name: maintain-public-site
description: Safely review and edit this public static portfolio. Use for HTML, CSS, JavaScript, metadata, icons, links, accessibility, security, or repository-maintenance work in KengoTeshima.github.io.
---

# Maintain the public site

1. Read `AGENTS.md` completely. Treat it as the policy source of truth.
2. Inspect `git status --short` and the relevant diff. Preserve unrelated user changes.
3. Search all HTML and JavaScript references before removing CSS selectors or assets.
4. Summarize the proposed diff before editing. Obtain the approval required by `AGENTS.md`.
5. Prefer existing CSS tokens and components. Keep the site build-free and dependency-light.
6. After editing, validate HTML parsing, asset references, `target="_blank"` link protection, forbidden additions, and the final diff.
7. Report findings by severity, then summarize changes and validation. Do not commit unless asked.
