const API_KEY = "your_openai_api_key"; // <-- Replace this with your actual API key

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", async () => {
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  userInput.value = "";
  userInput.disabled = true;
  sendBtn.disabled = true;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }],
      }),
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Sorry, no response.";
    appendMessage("ai", aiReply);
  } catch (error) {
    appendMessage("ai", "Error: Failed to get response.");
    console.error(error);
  }

  userInput.disabled = false;
  sendBtn.disabled = false;
});

function appendMessage(role, text) {
  const message = document.createElement("div");
  message.className = `message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
