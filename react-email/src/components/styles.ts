import { colors } from "./colors";
import { fonts } from "./fonts";

const main = {
  backgroundColor: colors.mainBg,
  padding: "20px 0",
};

const container = {
  padding: "30px",
  margin: "0 auto",
  maxWidth: "700px",
  backgroundColor: colors.mainForeground,
  borderRadius: "8px",
};

const h1 = {
  color: "#1f2937",
  fontFamily: fonts.basic,
  fontSize: "24px",
  fontWeight: "bold" as const,
  marginBottom: "40px",
  padding: "0",
};

const linkStyle = {
  color: colors.orange,
  fontFamily: fonts.basic,
  fontSize: "14px",
  textDecoration: "underline",
};

const button = {
  backgroundColor: colors.orange,
  border: "none",
  padding: "10px 20px",
  color: colors.whiteText,
  cursor: "pointer",
  borderRadius: "5px",
  fontWeight: "500",
  textDecoration: "none",
  fontSize: "16px",
  fontFamily: fonts.basic,
};

const text = {
  color: colors.text,
  fontFamily: fonts.basic,
  fontSize: "14px",
  margin: "24px 0",
  lineHeight: "1.5",
};

const textLight = {
  ...text,
  color: colors.lightText,
};

const footer = {
  color: colors.lightText,
  fontFamily: fonts.basic,
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: colors.codeBg,
  borderRadius: "5px",
  border: "1px solid #eee",
  color: colors.codeText,
};

export {
  main,
  container,
  h1,
  linkStyle,
  button,
  text,
  footer,
  code,
  textLight,
};
