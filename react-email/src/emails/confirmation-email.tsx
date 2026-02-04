import {
  Body,
  CodeBlock,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import {
  button,
  container,
  footer,
  h1,
  linkStyle,
  main,
  text,
} from "../components/styles";
import { Footer } from "../components/footer";
import { colors } from "../components/colors";

export type ConfirmationEmailProps = {
  code?: string;
};

export const ConfirmationEmail = ({ code }: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Potvrzujeme přihlášení k odběru služeb</Preview>
      <Container style={container}>
        <Heading style={h1}>OSVČ365: Předplatné je aktivováno</Heading>

        <Text style={{ ...text, marginBottom: "14px" }}>
          Od této chvíle Vám budeme pravidelně zasílat užitečné informace,
          povinnosti a novinky týkající se živností v České republice.
        </Text>
        {code && (
          <>
            <Text style={{ ...text, marginBottom: "14px" }}>
              Níže naleznete slevový kód, který můžete darovat svým známým nebo
              využít pro svůj další nákup.
            </Text>

            <Container
              style={{
                padding: "0",
                margin: "40px 0px",
              }}
            >
              <Heading
                style={{
                  ...h1,
                  fontSize: "18px",
                  marginBottom: "12px",
                  padding: "0",
                }}
              >
                Slevový kód
              </Heading>
              <Text
                style={{
                  backgroundColor: colors.orange,
                  color: colors.whiteText,
                  borderRadius: "5px",
                  border: "1px solid #eee",
                  padding: "16px 4.5%",
                  width: "90.5%",
                  margin: "0px",
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {code}
              </Text>
            </Container>
          </>
        )}

        <Footer />
      </Container>
    </Body>
  </Html>
);

ConfirmationEmail.PreviewProps = {
  code: "sparo-ndigo-amurt-secan",
} as ConfirmationEmailProps;

export default ConfirmationEmail;
