// Export all email components from react-email workspace

export { renderAlertNotificationEmail } from "./functions/render-email";
export { renderMonthlyNotificationEmail } from "./functions/render-email";
export { renderConfirmationEmail } from "./functions/render-email";

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
