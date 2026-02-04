// Export all email components from react-email workspace

export {
  AlertNotificationEmail,
  AlertNotificationEmailProps,
} from "./emails/alert-notification-email";
export {
  ConfirmationEmail,
  ConfirmationEmailProps,
} from "./emails/confirmation-email";
export {
  MonthlyNotificationEmail,
  MonthlyNotificationEmailProps,
} from "./emails/monthly-notification-email";

export { sendEmail } from "./functions/send-email";

// Re-export react-email components for convenience
export {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
