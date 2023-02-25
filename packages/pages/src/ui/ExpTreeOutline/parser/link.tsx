import { Parser } from "../type";

const linkParser: Parser<string> = {
  test: (val) => {
    return typeof val === "string" && val.includes("//file");
  },
  displayName: (props) => (
    <a
      class="cursor-pointer text-link underline outline-offset-2"
      href={props.val}
    >
      {props.val}
    </a>
  ),
};

export default linkParser;
