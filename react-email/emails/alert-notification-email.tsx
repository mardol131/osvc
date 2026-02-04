import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { format } from "date-fns/format";

export type AlertNotificationEmailProps = {
  date: Date;
  dayGap: number;
  heading: string;
  description?: string;
  link?: string;
  accessLink: string;
};

export const AlertNotificationEmail = ({
  date,
  dayGap,
  heading,
  description,
  link,
  accessLink,
}: AlertNotificationEmailProps) => {
  let header = "";
  if (dayGap <= 0) {
    header = "Dnes je poslední den pro splnění povinnosti";
  } else {
    header = `${dayGap === 1 ? "Zbývá" : dayGap <= 4 ? "Zbývají" : "Zbývá"} ${dayGap} ${dayGap === 1 ? "den" : dayGap <= 4 ? "dny" : "dní"} pro splnění povinnosti`;
  }
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Blížící se termín</Preview>
        <Container style={container}>
          <Heading style={h1}>{header}</Heading>

          <div>
            <Heading style={{ ...h1, fontSize: "18px", marginBottom: "12px" }}>
              {heading}
            </Heading>
            <ul style={{ marginTop: "12px", marginBottom: "24px" }}>
              <li>
                <Text style={{ ...text }}>
                  {description}
                  {link && (
                    <>
                      {" "}
                      -{" "}
                      <a
                        style={{ fontWeight: 600, color: "#f59f0a" }}
                        href={link}
                      >
                        Více informací
                      </a>{" "}
                    </>
                  )}
                  <br
                    style={{ ...text, whiteSpace: "nowrap", fontWeight: 700 }}
                  />
                  <span style={{ fontWeight: 600 }}>
                    Do {format(new Date(date), "d.M.yyyy")}
                  </span>
                </Text>
              </li>
            </ul>
          </div>
          <Link href={accessLink} target="_blank">
            <button
              style={{
                backgroundColor: "#f59f0a",
                border: "none",
                padding: "10px 20px",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "5px",
                fontWeight: "500",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Měsíční souhrn
            </button>
          </Link>

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
              style={{ color: "#898989" }}
            >
              OSVČ365
            </Link>
          </Text>
          <Text style={{ ...footer, marginTop: 0 }}>
            © {new Date().getFullYear()} OSVČ365. Všechna práva vyhrazena.
          </Text>
          <Text style={{ ...footer, marginTop: 0 }}>
            Údaje v tomto emailu nelze považovat za právní či daňové
            poradenství. Pro konkrétní situace doporučujeme konzultaci s
            odborníkem.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

AlertNotificationEmail.PreviewProps = {
  dayString: "sparo-ndigo-amurt-secan",
  date: new Date(),
  dayGap: 2,
  heading: "Daňové přiznání",
  description: "Popis povinnosti",
  link: "https://osvc365.cz",
  accessLink: "https://osvc365.cz/mesicni-souhrn",
} as AlertNotificationEmailProps;

export default AlertNotificationEmail;
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
