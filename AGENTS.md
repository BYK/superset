<!-- This section is maintained by the coding agent via lore (https://github.com/BYK/opencode-lore) -->
## Long-term Knowledge

### Gotcha

<!-- lore:019cc484-f0e1-7016-a851-177fb9ad2cc4 -->
* **AGENTS.md must be excluded from markdown linters**: AGENTS.md is auto-managed by lore and uses \`\*\` list markers and long lines that violate typical remark-lint rules (unordered-list-marker-style, maximum-line-length). When a project uses remark with \`--frail\` (warnings become errors), AGENTS.md will fail CI. Fix: add \`AGENTS.md\` to \`.remarkignore\`. This applies to any lore-managed project with markdown linting.

<!-- lore:019cc40e-e56e-71e9-bc5d-545f97df732b -->
* **Consola prompt cancel returns truthy Symbol, not false**: When a user cancels a \`consola\` / \`@clack/prompts\` confirmation prompt (Ctrl+C), the return value is \`Symbol(clack:cancel)\`, not \`false\`. Since Symbols are truthy in JavaScript, checking \`!confirmed\` will be \`false\` and the code falls through as if the user confirmed. Fix: use \`confirmed !== true\` (strict equality) instead of \`!confirmed\` to correctly handle cancel, false, and any other non-true values.

<!-- lore:019cc484-f0e7-7a64-bea1-f3f98e9c56c1 -->
* **Craft v2 GitHub App must be installed per-repo**: The Craft v2 release/publish workflows use \`actions/create-github-app-token@v1\` which requires the GitHub App to be installed on the specific repository. If the app is configured for "Only select repositories", adding a new repo to the Craft pipeline requires manually adding it at GitHub Settings → Installations → \[App] → Configure. The \`APP\_ID\` variable and \`APP\_PRIVATE\_KEY\` secret are set in the \`production\` environment, not at repo level. Symptom: 404 on \`GET /repos/{owner}/{repo}/installation\`.

<!-- lore:019cc303-e397-75b9-9762-6f6ad108f50a -->
* **Zod z.coerce.number() converts null to 0 silently**: Zod gotchas in this codebase: (1) \`z.coerce.number()\` passes input through \`Number()\`, so \`null\` silently becomes \`0\`. Be aware if \`null\` vs \`0\` distinction matters. (2) Zod v4 \`.default({})\` short-circuits — it returns the default value without parsing through inner schema defaults. So \`.object({ enabled: z.boolean().default(true) }).default({})\` returns \`{}\`, not \`{ enabled: true }\`. Fix: provide fully-populated default objects. This affected nested config sections in src/config.ts during the v3→v4 upgrade.
<!-- End lore-managed section -->
