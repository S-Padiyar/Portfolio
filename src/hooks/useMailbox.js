import { useEffect, useRef, useState } from "react";
import usePersistentState from "./usePersistentState";
import { MAIL_ITEMS } from "@/data/mail";
import { isValidContactSubmission, submitContactForm } from "@/services/contactService";

/** Own inbox state and secure contact-form submission. */
export default function useMailbox({ beep, unlockAchievement }) {
  const statusTimerRef = useRef(null);
  const [mailTab, setMailTab] = useState("inbox");
  const [openLetterId, setOpenLetterId] = useState(null);
  // Preserve which messages a visitor has opened across page refreshes.
  const [readLetters, setReadLetters] = usePersistentState(
    "portfolio:read-mail",
    {},
    value => value !== null && typeof value === "object" && !Array.isArray(value)
  );
  const [composeName, setComposeName] = useState("");
  const [composeEmail, setComposeEmail] = useState("");
  const [composeMsg, setComposeMsg] = useState("");
  const [mailSent, setMailSent] = useState(false);

  useEffect(() => () => clearTimeout(statusTimerRef.current), []);

  function openLetter(id) {
    unlockAchievement("mail_reader");
    beep(300, 0.05);
    setOpenLetterId(id);
    setReadLetters(current => ({ ...current, [id]: true }));
  }

  async function sendMail() {
    const senderEmail = composeEmail.trim();
    const message = composeMsg.trim();
    if (mailSent === "sending") return;
    if (!isValidContactSubmission(senderEmail, message)) {
      setMailSent("invalid");
      return;
    }

    setMailSent("sending");
    try {
      await submitContactForm({ name: composeName, email: senderEmail, message });
      unlockAchievement("message_sent");
      beep(500, 0.05);
      setMailSent("sent");
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = setTimeout(() => setMailSent(false), 5000);
      setComposeName("");
      setComposeEmail("");
      setComposeMsg("");
    } catch (error) {
      console.error("Contact form failed:", error);
      setMailSent("error");
    }
  }

  return {
    composeEmail,
    composeMsg,
    composeName,
    mailSent,
    mailTab,
    openLetter,
    openLetterId,
    readLetters,
    sendMail,
    setComposeEmail,
    setComposeMsg,
    setComposeName,
    setMailTab,
    setOpenLetterId,
    unreadCount: MAIL_ITEMS.filter(item => !readLetters[item.id]).length
  };
}
