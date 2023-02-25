const plugin = require("tailwindcss/plugin");

const headings = plugin(({ addComponents, theme }) => {
  addComponents({
    ".icon-search-node": {
      "-webkit-mask-image": "var(--image-file-nodeSearch)",
    },
    ".icon-mask": {
      "--override-icon-mask-background-color": "rgb(110 110 110)",
      "-webkit-mask-position": "var(--spritesheet-position)",
      backgroundColor: "var(--override-icon-mask-background-color)",
    },
    ".mediumicon": {
      "-webkit-mask-image": "var(--image-file-mediumIcons)",
    },
    ".mediumicon-list": {
      "--spritesheet-position": "64px 16px",
    },
    ".mediumicon-manifest": {
      "--spritesheet-position": "-48px 64px",
    },
    ".mediumicon-fetch": {
      "--spritesheet-position": "-16px 80px",
    },
    ".mediumicon-table": {
      "--spritesheet-position": "-16px 48px",
    },
  });
});
module.exports = headings;
