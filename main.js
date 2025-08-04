const input = document.getElementById("user-input");
const output = document.getElementById("output");
const form = document.getElementById("chat-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  input.value = "";

  // Show "typing..."
  appendMessage("Neroxa", "Typing...");

  try {
    const response = await fetch("https://api.neroxa-ai.com/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    output.lastChild.textContent = `Neroxa: ${data.reply || "Sorry, I didn’t understand that."}`;
  } catch (error) {
    output.lastChild.textContent = "Neroxa: Error connecting to the server.";
  }
});

function appendMessage(sender, message) {
  const p = document.createElement("p");
  p.textContent = `${sender}: ${message}`;
  output.appendChild(p);
}
