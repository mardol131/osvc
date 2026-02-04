import { Container, Img, Link, Text } from "@react-email/components";
import { container, footer, linkStyle, text, textLight } from "./styles";
import { colors } from "./colors";

export function Footer() {
  return (
    <>
      <Container
        style={{
          padding: "0px",
          paddingTop: "20px",
          margin: "60px 0px 0px 0px",
          borderTop: `2px solid ${colors.border}`,
        }}
      >
        <Text style={textLight}>
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
            style={{ ...linkStyle, color: "#898989" }}
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
    </>
  );
}
