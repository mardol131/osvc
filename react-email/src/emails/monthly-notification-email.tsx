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
import { format } from "date-fns";
import {
  button,
  container,
  footer,
  h1,
  linkStyle,
  main,
  text,
} from "../components/styles";
import { Obligation } from "../components/obligation";
import { Footer } from "../components/footer";
import { AccessButton } from "../components/accessButton";

export type Notification = {
  text: string;
  mobileText: string;
  link?: string | null;
  description: string;
  date?: string | null;
};

export type CustomMessage = {
  heading: string;
  notifications: Notification[];
  order?: number | null;
};

export type MonthlyNotificationEmailProps = {
  messages: CustomMessage[];
  dateLabel: string;
  accessLink: string;
};

export default function MonthlyNotificationEmail({
  messages,
  dateLabel,
  accessLink,
}: MonthlyNotificationEmailProps) {
  if (messages.length === 0) {
    return (
      <Html>
        <Head />
        <Body style={main}>
          <Preview>Měsíční přehled změn</Preview>
          <Container style={container}>
            <Heading style={h1}>
              OSVČ365: Měsíční přehled změn na {dateLabel}
            </Heading>

            <Text style={{ ...text, marginBottom: "14px" }}>
              Tento měsíc nejsou žádné nové změny k zobrazení.
            </Text>

            <Link href="LINK" target="_blank">
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
                  fontSize: "16px",
                }}
              >
                Detailní přehled
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
                style={{ ...linkStyle, color: "#898989" }}
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
  }

  const orderedMessages = messages.sort((a, b) => {
    const orderA = a.order || 0;
    const orderB = b.order || 0;

    // Položky s order: 1 jsou vždy první
    if (orderA === 1 && orderB !== 1) return -1;
    if (orderB === 1 && orderA !== 1) return 1;
    return (b.notifications.length || 0) - (a.notifications.length || 0);
  });

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Měsíční přehled změn</Preview>
        <Container style={container}>
          <Heading style={h1}>
            OSVČ365: Měsíční přehled změn na {dateLabel}
          </Heading>

          <Text style={{ ...text, marginBottom: "14px" }}>
            Níže Vám posíláme přehled změn pro následující měsíc.
          </Text>

          {orderedMessages.map((message, index) => (
            <div key={index}>
              <Heading
                style={{ ...h1, fontSize: "18px", marginBottom: "12px" }}
              >
                {message.heading}
              </Heading>
              <ul style={{ marginTop: "12px", marginBottom: "24px" }}>
                {message.notifications.map((notification, idx) => (
                  <Obligation key={idx} notification={notification} />
                ))}
              </ul>
            </div>
          ))}
          <AccessButton href={accessLink} />

          <Footer />
        </Container>
      </Body>
    </Html>
  );
}

MonthlyNotificationEmail.PreviewProps = {
  messages: [
    {
      heading: "Přehled změn v legislativě",
      notifications: [
        {
          text: "Nové sazby DPH pro rok 2024",
          mobileText: "Nové sazby DPH pro rok 2024",
          link: "https://osvc365.cz/dph-2024",
          description:
            "Seznamte se s novými sazbami DPH, které vstupují v platnost od 1. ledna 2024.",
          date: "2024-01-15",
        },
        {
          text: "Změny v odpočtech nákladů pro OSVČ",
          mobileText: "Změny v odpočtech nákladů pro OSVČ",
          link: "https://osvc365.cz/odpocty-nakladu-2024",
          description:
            "Nová pravidla pro odpočty nákladů, která mohou ovlivnit vaše daňové přiznání.",
          date: "2024-01-10",
        },
      ],
      order: 2,
    },
    {
      heading: "Obecné informace",
      notifications: [
        {
          text: "Integrace s účetním softwarem XYZ",
          mobileText: "Integrace s účetním softwarem XYZ",
          link: "https://osvc365.cz/ucetni-software-xyz",
          description:
            "Nyní můžete synchronizovat svá data přímo s populárním účetním softwarem XYZ.",
          date: "2024-01-20",
        },
        {
          text: "Vylepšené reporty a analýzy",
          mobileText: "Vylepšené reporty a analýzy",
          link: "https://osvc365.cz/vylepsene-reporty",
          description:
            "Nové možnosti reportování vám pomohou lépe sledovat vaše podnikání.",
          date: "2024-01-18",
        },
      ],
      order: 1,
    },
  ],
  dateLabel: "Březen 2025",
  accessLink: "https://osvc365.cz/prihlaseni",
} as MonthlyNotificationEmailProps;
