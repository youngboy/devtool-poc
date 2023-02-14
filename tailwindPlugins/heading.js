const plugin = require("tailwindcss/plugin");

const headings = plugin(({ addComponents, theme }) => {
  addComponents({
    ".header": {
      backgroundColor: theme("colors.elevation.1"),
      borderBottomWidth: "1px",
      borderStyle: "solid",
      borderColor: theme("colors.details-hairline"),
      paddingLeft: theme("padding.1"),
      paddingRight: theme("padding.1"),
      paddingTop: "1px",
      paddingBottom: "1px",
      lineHeight: theme("lineHeight.header"),
    },
    ".header::marker": {
      color: "rgb(110, 110, 110)",
      fontSize: "11px",
      lineHeight: "1",
    },
  });
});
module.exports = headings;
