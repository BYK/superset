<!-- This section is maintained by the coding agent via lore (https://github.com/BYK/opencode-lore) -->
## Long-term Knowledge

### Gotcha

<!-- lore:019cc484-f0e7-7a64-bea1-f3f98e9c56c1 -->
* **Craft v2 GitHub App must be installed per-repo**: The Craft v2 release/publish workflows use \`actions/create-github-app-token@v1\` which requires the GitHub App to be installed on the specific repository. If the app is configured for "Only select repositories", adding a new repo to the Craft pipeline requires manually adding it at GitHub Settings → Installations → \[App] → Configure. The \`APP\_ID\` variable and \`APP\_PRIVATE\_KEY\` secret are set in the \`production\` environment, not at repo level. Symptom: 404 on \`GET /repos/{owner}/{repo}/installation\`.
<!-- End lore-managed section -->
