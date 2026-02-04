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

            <div>
              <Heading
                style={{ ...h1, fontSize: "18px", marginBottom: "12px" }}
              >
                Slevový kód
              </Heading>
              <Text
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  borderRadius: "5px",
                  border: "1px solid #eee",
                  padding: "16px 4.5%",
                  width: "90.5%",
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {code}
              </Text>
            </div>
          </>
        )}

        <Text style={text}>
          S pozdravem,
          <br />
          Tým OSVČ365
        </Text>

        <Img
          src={`https://www.osvc365.cz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-osvc.9507aaa6.png&w=128&q=75`}
          width="32"
          height="32"
          alt="OSVČ365 Logo"
        />
        <Text style={footer}>
          <Link
            href="https://osvc365.cz"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            OSVČ365
          </Link>
        </Text>
        <Text style={{ ...footer, marginTop: 0 }}>
          © {new Date().getFullYear()} OSVČ365. Všechna práva vyhrazena.
        </Text>
        <Text style={{ ...footer, marginTop: 0 }}>
          Údaje v tomto emailu nelze považovat za právní či daňové poradenství.
          Pro konkrétní situace doporučujeme konzultaci s odborníkem.
        </Text>
      </Container>
    </Body>
  </Html>
);

ConfirmationEmail.PreviewProps = {
  code: "sparo-ndigo-amurt-secan",
} as ConfirmationEmailProps;

export default ConfirmationEmail;
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
