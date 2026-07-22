export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xpqvrwzq";

export function isValidContactSubmission(email, message) {
  return /^\S+@\S+\.\S+$/.test(email.trim()) && Boolean(message.trim());
}

/** Submit the public contact form through Formspree. */
export async function submitContactForm({ name, email, message }, fetchImpl = fetch) {
  const response = await fetchImpl(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name.trim() || "Portfolio visitor",
      email: email.trim(),
      message: message.trim()
    })
  });

  if (!response.ok) throw new Error("Formspree rejected the form submission.");
}
