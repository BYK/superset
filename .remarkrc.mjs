const config = {
  plugins: [
    "remark-preset-lint-consistent",
    "remark-preset-lint-recommended",
    "remark-lint-no-empty-sections",
    "remark-validate-links",
    ["remark-lint-code-block-style", "fenced"],
    ["remark-lint-fenced-code-marker", "`"],
    ["remark-lint-heading-style", "atx"],
    ["remark-lint-maximum-line-length", 120],
    ["remark-lint-ordered-list-marker-style", "."],
    ["remark-lint-rule-style", "---"],
    ["remark-lint-emphasis-marker", "*"],
    ["remark-lint-strong-marker", "*"],
    ["remark-lint-unordered-list-marker-style", "-"],
    ["remark-lint-no-duplicate-headings", false],
    ["remark-lint-list-item-indent", "one"],
  ],
  settings: {
    commonmark: true,
    gfm: true,
  },
};
export default config;
