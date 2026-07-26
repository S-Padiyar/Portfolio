import { useCallback, useRef, useState } from "react";
import { requestAssistantReply } from "@/services/assistantClient";

const WELCOME_MESSAGE = {
  from: "ai",
  text: "Hey! I'm Botmay. I can help you explore Sunmay's projects, skills, experience, education, or anything else on this portfolio. What would you like to check out first?"
};

const CONNECTION_ERROR_MESSAGE = "I couldn't connect right now. Please try again later.";
const HIGH_DEMAND_MESSAGE = "The model is experiencing high demand right now. Please try again shortly.";
const CONFIGURATION_ERROR_MESSAGE = "Botmay is deployed, but the assistant backend is not configured correctly yet.";

/** Manage the Botmay conversation and its single in-flight request. */
export default function usePortfolioAssistant({ beep, endpoint, unlockAchievement }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const requestInFlightRef = useRef(false);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || requestInFlightRef.current) return;

    requestInFlightRef.current = true;
    unlockAchievement("first_chat");
    beep(440, 0.04);

    const history = messages.filter(message => !message.pending);
    const pendingId = Date.now();
    const requestMessages = [...history, { from: "user", text }];
    setMessages([...requestMessages, {
      from: "ai",
      text: "Thinking...",
      pending: pendingId
    }]);
    setInput("");

    try {
      const reply = await requestAssistantReply(endpoint, requestMessages);
      setMessages(current => current.map(message => message.pending === pendingId
        ? { from: "ai", text: reply }
        : message));
      beep(620, 0.04);
    } catch (error) {
      console.error("Companion request failed:", error);
      const errorMessage = error.code === "HIGH_DEMAND"
        ? HIGH_DEMAND_MESSAGE
        : error.code === "WORKER_ERROR"
          ? `${CONFIGURATION_ERROR_MESSAGE} (${error.message})`
        : CONNECTION_ERROR_MESSAGE;
      setMessages(current => current.map(message => message.pending === pendingId
        ? { from: "ai", text: errorMessage }
        : message));
    } finally {
      requestInFlightRef.current = false;
    }
  }, [beep, endpoint, input, messages, unlockAchievement]);

  return {
    aiInput: input,
    aiMessages: messages,
    sendAiMessage: sendMessage,
    setAiInput: setInput
  };
}
